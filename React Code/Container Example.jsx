import DOMPurify from 'dompurify';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useError } from '../../../hooks/ErrorTimeout.jsx';
import { ngome } from '../../../utils/ngome.js';
import { CashFlowForecastForm } from './CashFlowForm.jsx';

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

const emptyMonths = () => Object.fromEntries(MONTHS.map((m) => [m, '']));

const emptyCashflow = () => ({
    item: '',
    ...emptyMonths(),
});

const sumRow = (row) => MONTHS.reduce((sum, m) => sum + parseFloat(row[m] || 0.0), 0);

export const CashFlowForecastContainer = () => {
    const [formData, setFormData] = useState({
        template: 'cashflow_forecast',
        totalSales: emptyMonths(),
        directCost: emptyMonths(),
        grossProfit: emptyMonths(),
        grossMargin: emptyMonths(),
        cashflowOut: [emptyCashflow()],
        staffingNiPensions: emptyMonths(),
        expenses: emptyMonths(),
        netMovement: emptyMonths(),
        openingBalance: emptyMonths(),
        closingBalance: emptyMonths(),
    });
    const [contactList, setContactList] = useState([]);
    const [loading, setLoading] = useState(false);
    const { error, setErrorTimeout } = useError();

    useEffect(() => {
        const controller = new AbortController();

        const fetchContact = async () => {
            try {
                const response = await ngome.get('/users/', {
                    signal: controller.signal,
                });

                if (response.data.status === 'success') {
                    setContactList(response.data.data);
                }

                return { success: true, data: response.data.data };
            } catch (error) {
                if (error.name === 'CanceledError') return;
                const errorData = error?.response?.data;
                const errorMsg =
                    errorData?.detail ||
                    errorData?.message ||
                    error.message ||
                    (typeof errorData === 'string' ? errorData : JSON.stringify(errorData));
                setErrorTimeout(errorMsg);

                return { success: false, error: errorMsg };
            }
        };

        fetchContact();

        return () => controller.abort();
    }, [setErrorTimeout]);

    const handleInput = useCallback((e) => {
        const { name, value, selectedOptions } = e.target;

        let cleanData;

        if (name === 'contact') {
            cleanData = Array.from(selectedOptions, (o) => DOMPurify.sanitize(o.value));
        } else {
            cleanData = typeof value === 'string' ? DOMPurify.sanitize(value) : value;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: cleanData,
        }));
    }, []);

    const handleSectionChange = useCallback((section, month, value) => {
        const cleanData = DOMPurify.sanitize(value);
        setFormData((prev) => ({
            ...prev,
            [section]: { ...prev[section], [month]: cleanData },
        }));
    }, []);

    const handleRowChange = useCallback((index, field, value) => {
        const cleanData = DOMPurify.sanitize(value);
        setFormData((prev) => {
            const rows = [...prev.cashflowOut];
            rows[index] = { ...rows[index], [field]: cleanData };

            return { ...prev, cashflowOut: rows };
        });
    }, []);

    const handleAddRow = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            cashflowOut: [...prev.cashflowOut, emptyCashflow()],
        }));
    }, []);

    const handleDeleteRow = useCallback((index) => {
        setFormData((prev) => {
            const rows = prev.cashflowOut || [];
            if (rows.length === 1) return prev;
            const filtered = prev.cashflowOut.filter((_, i) => i !== index);

            return { ...prev, cashflowOut: filtered };
        });
    }, []);

    // Vertical (column-wise) totals across all cashflowOut rows, per month
    const cashflowOutTotals = useMemo(() => {
        const totals = emptyMonths();
        formData.cashflowOut.forEach((row) => {
            MONTHS.forEach((m) => {
                totals[m] = (totals[m] || 0) + (parseFloat(row[m]) || 0);
            });
        });
        return totals;
    }, [formData.cashflowOut]);

    const totalSalesSum = useMemo(() => sumRow(formData.totalSales), [formData.totalSales]);

    const totalDirectCost = useMemo(() => sumRow(formData.directCost), [formData.directCost]);

    const totalGrossProfit = useMemo(() => sumRow(formData.grossProfit), [formData.grossProfit]);

    const totalStaffingNiPensions = useMemo(
        () => sumRow(formData.staffingNiPensions),
        [formData.staffingNiPensions],
    );

    const totalExpenses = useMemo(() => sumRow(formData.expenses), [formData.expenses]);

    const totalNetMovement = useMemo(() => sumRow(formData.netMovement), [formData.netMovement]);

    const totalOpeningBalances = useMemo(
        () => sumRow(formData.openingBalance),
        [formData.openingBalance],
    );

    const totalClosingBalances = useMemo(
        () => sumRow(formData.closingBalance),
        [formData.closingBalance],
    );

    const totalGrossMargin = useMemo(() => sumRow(formData.grossMargin), [formData.grossMargin]);

    const handleSubmission = useCallback(
        async (e) => {
            e.preventDefault();
            setLoading(true);
            setErrorTimeout(null);

            if (!formData.contact) {
                setErrorTimeout('At least one contact must be selected.');
                setLoading(false);
                return { success: false, error: error };
            }

            try {
                const response = await ngome.post('/documents/generate/', formData);

                return { success: true, data: response.data };
            } catch (error) {
                const errorData = error?.response?.data;
                const errorMsg =
                    errorData?.detail ||
                    errorData?.message ||
                    error.message ||
                    (typeof errorData === 'string' ? errorData : JSON.stringify(errorData));
                setErrorTimeout(errorMsg);

                return { success: false, error: errorMsg };
            } finally {
                setLoading(false);
            }
        },
        [formData, error, setErrorTimeout],
    );

    return (
        <>
            <CashFlowForecastForm
                loading={loading}
                error={error}
                formData={formData}
                addRow={handleAddRow}
                deleteRow={handleDeleteRow}
                rowChange={handleRowChange}
                contactList={contactList}
                inputChange={handleInput}
                onSubmit={handleSubmission}
                totalSalesSum={totalSalesSum}
                cashflowOutTotals={cashflowOutTotals}
                totalDirectCost={totalDirectCost}
                totalGrossProfit={totalGrossProfit}
                totalStaffingNiPensions={totalStaffingNiPensions}
                totalExpenses={totalExpenses}
                totalNetMovement={totalNetMovement}
                totalOpeningBalances={totalOpeningBalances}
                totalClosingBalances={totalClosingBalances}
                totalGrossMargin={totalGrossMargin}
                onSectionChange={handleSectionChange}
                sumRow={sumRow}
            />
        </>
    );
};
