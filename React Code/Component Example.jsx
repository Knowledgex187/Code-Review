import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MonthRow } from '../../shared/MonthRow.jsx';

export const CashFlowForecastForm = ({
    inputChange,
    formData,
    contactList,
    loading,
    error,
    onSubmit,
    rowChange,
    addRow,
    deleteRow,
    totalSalesSum,
    totalGrossMargin,
    totalDirectCost,
    totalGrossProfit,
    totalStaffingNiPensions,
    totalExpenses,
    totalNetMovement,
    totalOpeningBalances,
    totalClosingBalances,
    onSectionChange,
    sumRow,
}) => {
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate('/documents/finance');
    };

    const handleSubmit = async (e) => {
        const { success, data } = await onSubmit(e);
        if (success) {
            navigate('/');
            toast.success(data?.detail);
        } else {
            toast.error(error);
        }
    };

    return (
        <>
            <div className="container-wrapper">
                <h1 className="title-services">Cashflow Forecast</h1>

                <form onSubmit={handleSubmit}>
                    {/* Selector */}
                    <div className="form-details">
                        <label htmlFor="contact" className="asterisk-label">
                            <span className="block text-[0.75rem] text-gray-600"></span>
                            Contacts
                        </label>

                        <select
                            className="form-input"
                            onChange={inputChange}
                            id="contact"
                            name="contact"
                            value={formData.contact || []}
                            multiple>
                            {contactList.map((c, i) => (
                                <option key={i} value={c.uuid}>
                                    {c.companyName} - {c.contactTitle} {c.firstName} {c.lastName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Total Sales Section*/}
                    <div className="form-section">
                        <h1 className="title-services">Cashflow</h1>
                        <MonthRow
                            label="Total Sales"
                            values={formData.totalSales}
                            onChange={(month, value) => onSectionChange('totalSales', month, value)}
                            total={totalSalesSum}
                        />
                    </div>

                    {/* Direct Cost */}
                    <div className="form-section">
                        <h1 className="title-services">Direct Cost & Margin</h1>
                        <MonthRow
                            label="Direct Costs"
                            values={formData.directCost}
                            onChange={(month, value) => onSectionChange('directCost', month, value)}
                            total={totalDirectCost}
                        />

                        {/* Gross Profit */}
                        <MonthRow
                            label="Gross Profit"
                            values={formData.grossProfit}
                            onChange={(month, value) =>
                                onSectionChange('grossProfit', month, value)
                            }
                            total={totalGrossProfit}
                        />

                        {/* Gross Margin */}
                        <MonthRow
                            label="Gross Margin"
                            values={formData.grossMargin}
                            onChange={(month, value) =>
                                onSectionChange('grossMargin', month, value)
                            }
                            total={totalGrossMargin}
                        />
                    </div>

                    {/* Cashflow Out */}
                    <div className="form-section">
                        <h1 className="title-services">Cashflow Out</h1>
                        {(formData.cashflowOut || []).map((c, i) => (
                            <div className="grid grid-cols-[11.25rem_repeat(13,11.25rem)_2rem_2rem] gap-4 my-2">
                                <input
                                    type="text"
                                    id="item"
                                    name="item"
                                    value={c.item || ''}
                                    placeholder="Item"
                                    onChange={(e) => rowChange(i, 'item', e.target.value)}
                                    className="form-input"
                                />

                                {Object.keys(c)
                                    .filter((k) => k !== 'item')
                                    .map((m) => (
                                        <input
                                            key={m}
                                            type="number"
                                            value={c[m] ?? ''}
                                            placeholder={m.charAt(0).toUpperCase() + m.slice(1)}
                                            onChange={(e) => rowChange(i, m, e.target.value)}
                                            className="form-input"
                                        />
                                    ))}

                                <input
                                    type="number"
                                    value={sumRow(c).toFixed(2)}
                                    placeholder="Total"
                                    className="form-input"
                                    readOnly
                                />

                                <button type="button" onClick={addRow}>
                                    <PlusCircleIcon className="h-8 w-8 text-blue-500 cursor-pointer" />
                                </button>

                                <button type="button" onClick={() => deleteRow(i)}>
                                    <MinusCircleIcon className="h-8 w-8 text-blue-500 cursor-pointer" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Staffing*/}
                    <MonthRow
                        label="Staffing/NI/Pensions"
                        values={formData.staffingNiPensions}
                        onChange={(month, value) =>
                            onSectionChange('staffingNiPensions', month, value)
                        }
                        total={totalStaffingNiPensions}
                    />

                    {/* Expenses*/}
                    <MonthRow
                        label="Expenses"
                        values={formData.expenses}
                        onChange={(month, value) => onSectionChange('expenses', month, value)}
                        total={totalExpenses}
                    />

                    {/* Net Movement*/}
                    <MonthRow
                        label="Net Movement"
                        values={formData.netMovement}
                        onChange={(month, value) => onSectionChange('netMovement', month, value)}
                        total={totalNetMovement}
                    />

                    <div className="form-section">
                        <h1 className="title-services">Balances</h1>
                        {/* Opening Balance*/}
                        <MonthRow
                            label="Opening Balance"
                            values={formData.openingBalance}
                            onChange={(month, value) =>
                                onSectionChange('openBalance', month, value)
                            }
                            total={totalOpeningBalances}
                        />

                        {/* Closing Balance*/}
                        <MonthRow
                            label="Expenses"
                            values={formData.closingBalance}
                            onChange={(month, value) =>
                                onSectionChange('closingBalance', month, value)
                            }
                            total={totalClosingBalances}
                        />
                    </div>

                    <div className="button-layout">
                        <button type="submit" className="save-button">
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                        <button type="button" className="danger-button" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};
