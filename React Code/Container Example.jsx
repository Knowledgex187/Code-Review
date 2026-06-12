import DOMPurify from 'dompurify';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useError } from '../../../hooks/ErrorTimeout.jsx';
import { ngome } from '../../../utils/ngome.js';
import { CashFlowForecastForm } from './CashFlowForm.jsx';

export const CashFlowForecastContainer = () => {
    const [formData, setFormData] = useState({
        template: 'cashflow_forecast',
        totalSales: [
            {
                jan: '',
                feb: '',
                mar: '',
                apr: '',
                may: '',
                jun: '',
                jul: '',
                aug: '',
                sep: '',
                oct: '',
                nov: '',
                dec: '',
                totalSales: '',
            },
        ],
        cashflowOut: [
            {
                item: '',
                jan: '',
                feb: '',
                mar: '',
                apr: '',
                may: '',
                jun: '',
                jul: '',
                aug: '',
                sep: '',
                oct: '',
                nov: '',
                dec: '',
                totalCashflowOut: '',
            },
        ],
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
            cleanData = Array.from(selectedOptions, (o) => o.value);
        } else {
            cleanData = typeof value === 'string' ? DOMPurify.sanitize(value) : value;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: cleanData,
        }));
    }, []);

    const handleAddRow = () => {
        setFormData((prev) => ({
            ...prev,
            cashflowOut: [
                ...(prev.cashflowOut || []),
                {
                    item: '',
                    jan: '',
                    feb: '',
                    mar: '',
                    apr: '',
                    may: '',
                    jun: '',
                    jul: '',
                    aug: '',
                    sep: '',
                    oct: '',
                    nov: '',
                    dec: '',
                    totalCashflowOut: '',
                },
            ],
        }));
    };

    const handleDeleteRow = (index) => {
        setFormData((prev) => {
            const rows = prev.cashflowOut || [];
            if (rows.length === 1) return prev;
            const filtered = prev.cashflowOut.filter((_, i) => i !== index);

            return { ...prev, cashflowOut: filtered };
        });
    };

    const handleTotalSalesRowChange = (index, field, value) => {
        setFormData((prev) => {
            const rows = prev.totalSales || [];
            const updated = [...rows];
            if (!updated[index])
                updated[index] = {
                    jan: '',
                    feb: '',
                    mar: '',
                    apr: '',
                    may: '',
                    jun: '',
                    jul: '',
                    aug: '',
                    sep: '',
                    oct: '',
                    nov: '',
                    dec: '',
                    totalSales: '',
                };

            updated[index][field] = value;

            return { ...prev, totalSales: updated };
        });
    };

    const handleCashflowOutRowChange = (index, field, value) => {
        setFormData((prev) => {
            const rows = prev.cashflowOut || [];
            const updated = [...rows];
            if (!updated[index])
                updated[index] = {
                    item: '',
                    jan: '',
                    feb: '',
                    mar: '',
                    apr: '',
                    may: '',
                    jun: '',
                    jul: '',
                    aug: '',
                    sep: '',
                    oct: '',
                    nov: '',
                    dec: '',
                    totalCashflowOut: '',
                };

            updated[index][field] = value;

            return { ...prev, cashflowOut: updated };
        });
    };

    const totalSales = useMemo(() => {
        const rows = formData.totalSales || [];
        return rows.reduce((sum, row) => {
            return sum + (parseFloat(row.value) || 0.0);
        }, 0);
    }, [formData.totalSales]);

    const handleSubmission = async () => {
        setLoading(true);
        setErrorTimeout(null);

        if (!formData.contact) {
            toast.error('At least one contact must be selected.');
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
    };

    return (
        <>
            <CashFlowForecastForm
                loading={loading}
                error={error}
                formData={formData}
                addRow={handleAddRow}
                deleteRow={handleDeleteRow}
                rowChange={handleTotalSalesRowChange}
                rowChangeCashflow={handleCashflowOutRowChange}
                contactList={contactList}
                inputChange={handleInput}
                onSubmit={handleSubmission}
                totalSales={totalSales}
            />
        </>
    );
};
