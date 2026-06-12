import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
    totalSales,
    rowChangeCashflow,
}) => {
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate('/documents/finance');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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

                    {(formData.totalSales || []).map((s, i) => (
                        <div className="form-section">
                            <h1 className="title-services">Cashflow</h1>
                            <div
                                key={i}
                                className="grid grid-cols-[11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem] gap-4 my-2">
                                <label className="asterisk-label">Total Sales</label>

                                <input
                                    type="number"
                                    id="jan"
                                    name="jan"
                                    value={s.jan || ''}
                                    placeholder="Jan"
                                    onChange={(e) => rowChange(i, 'jan', e.target.value)}
                                    className="form-input"
                                />

                                <input
                                    type="number"
                                    id="feb"
                                    name="feb"
                                    value={s.feb || ''}
                                    placeholder="Feb"
                                    onChange={(e) => rowChange(i, 'feb', e.target.value)}
                                    className="form-input"
                                />

                                <input
                                    type="number"
                                    id="mar"
                                    name="mar"
                                    value={s.mar || ''}
                                    placeholder="Mar"
                                    onChange={(e) => rowChange(i, 'mar', e.target.value)}
                                    className="form-input"
                                />

                                <input
                                    type="number"
                                    id="apr"
                                    name="apr"
                                    value={s.apr || ''}
                                    placeholder="Apr"
                                    onChange={(e) => rowChange(i, 'apr', e.target.value)}
                                    className="form-input"
                                />

                                <input
                                    type="number"
                                    id="may"
                                    name="may"
                                    value={s.may || ''}
                                    placeholder="May"
                                    onChange={(e) => rowChange(i, 'may', e.target.value)}
                                    className="form-input"
                                />

                                <input
                                    type="number"
                                    id="jun"
                                    name="jun"
                                    value={s.jun || ''}
                                    placeholder="Jun"
                                    onChange={(e) => rowChange(i, 'jun', e.target.value)}
                                    className="form-input"
                                />

                                <input
                                    type="number"
                                    id="jul"
                                    name="jul"
                                    value={s.jul || ''}
                                    placeholder="Jul"
                                    onChange={(e) => rowChange(i, 'jul', e.target.value)}
                                    className="form-input"
                                />

                                <input
                                    type="number"
                                    id="aug"
                                    name="aug"
                                    value={s.aug || ''}
                                    placeholder="Aug"
                                    onChange={(e) => rowChange(i, 'aug', e.target.value)}
                                    className="form-input"
                                />

                                <input
                                    type="number"
                                    id="sep"
                                    name="sep"
                                    value={s.sep || ''}
                                    placeholder="Sep"
                                    onChange={(e) => rowChange(i, 'sep', e.target.value)}
                                    className="form-input"
                                />

                                <input
                                    type="number"
                                    id="oct"
                                    name="oct"
                                    value={s.oct || ''}
                                    placeholder="Oct"
                                    onChange={(e) => rowChange(i, 'oct', e.target.value)}
                                    className="form-input"
                                />

                                <input
                                    type="number"
                                    id="nov"
                                    name="nov"
                                    value={s.nov || ''}
                                    placeholder="Nov"
                                    onChange={(e) => rowChange(i, 'nov', e.target.value)}
                                    className="form-input"
                                />

                                <input
                                    type="number"
                                    id="dec"
                                    name="dec"
                                    value={s.dec || ''}
                                    placeholder="Dec"
                                    onChange={(e) => rowChange(i, 'dec', e.target.value)}
                                    className="form-input"
                                />

                                <input
                                    type="number"
                                    id="totalSales"
                                    name="totalSales"
                                    value={totalSales.toFixed(2)}
                                    placeholder="Total Sales"
                                    onChange={(e) => rowChange(i, 'totalSales', e.target.value)}
                                    className="form-input"
                                    readOnly
                                    disabled
                                />
                            </div>
                        </div>
                    ))}

                    <div className="form-section">
                        <h1 className="title-services">Direct Cost & Margin</h1>
                        <div className="grid grid-cols-[11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem] gap-4 my-2">
                            <label htmlFor="directCost" className="asterisk-label">
                                {' '}
                                Direct Cost
                            </label>
                            <input
                                type="number"
                                id="directJan"
                                name="directJan"
                                value={formData.directJan || ''}
                                placeholder="Jan"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="directFeb"
                                name="directFeb"
                                value={formData.directFeb || ''}
                                placeholder="Feb"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="directMar"
                                name="directMar"
                                value={formData.directMar || ''}
                                placeholder="Mar"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="directApr"
                                name="directApr"
                                value={formData.directApr || ''}
                                placeholder="Apr"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="directMay"
                                name="directMay"
                                value={formData.directMay || ''}
                                placeholder="May"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="directJun"
                                name="directJun"
                                value={formData.directJun || ''}
                                placeholder="Jun"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="directJul"
                                name="directJul"
                                value={formData.directJul || ''}
                                placeholder="Jul"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="directAug"
                                name="directAug"
                                value={formData.directAug || ''}
                                placeholder="Aug"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="directSep"
                                name="directSep"
                                value={formData.directSep || ''}
                                placeholder="Sep"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="directOct"
                                name="directOct"
                                value={formData.directOct || ''}
                                placeholder="Oct"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="directNov"
                                name="directNov"
                                value={formData.directNov || ''}
                                placeholder="Nov"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="directDec"
                                name="directDec"
                                value={formData.directDec || ''}
                                placeholder="Dec"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="totalDirectCost"
                                name="totalDirectCost"
                                value={formData.totalDirectCost || ''}
                                placeholder="Total Sales"
                                onChange={inputChange}
                                className="form-input"
                            />
                        </div>

                        <div className="grid grid-cols-[11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem] gap-4 my-2">
                            <label htmlFor="grossProfit" className="asterisk-label">
                                {' '}
                                Gross Profit
                            </label>
                            <input
                                type="number"
                                id="grossJan"
                                name="grossJan"
                                value={formData.grossJan || ''}
                                placeholder="Jan"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="grossFeb"
                                name="grossFeb"
                                value={formData.grossFeb || ''}
                                placeholder="Feb"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="grossMar"
                                name="grossMar"
                                value={formData.grossMar || ''}
                                placeholder="Mar"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="grossApr"
                                name="grossApr"
                                value={formData.grossApr || ''}
                                placeholder="Apr"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="grossMay"
                                name="grossMay"
                                value={formData.grossMay || ''}
                                placeholder="May"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="grossJun"
                                name="grossJun"
                                value={formData.grossJun || ''}
                                placeholder="Jun"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="grossJul"
                                name="grossJul"
                                value={formData.grossJul || ''}
                                placeholder="Jul"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="grossAug"
                                name="grossAug"
                                value={formData.grossAug || ''}
                                placeholder="Aug"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="grossSep"
                                name="grossSep"
                                value={formData.grossSep || ''}
                                placeholder="Sep"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="grossOct"
                                name="grossOct"
                                value={formData.grossOct || ''}
                                placeholder="Oct"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="grossNov"
                                name="grossNov"
                                value={formData.grossNov || ''}
                                placeholder="Nov"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="grossDec"
                                name="grossDec"
                                value={formData.grossDec || ''}
                                placeholder="Dec"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="totalGrossCost"
                                name="totalGrossCost"
                                value={formData.totalGrossCost || ''}
                                placeholder="Total Sales"
                                onChange={inputChange}
                                className="form-input"
                            />
                        </div>

                        <div className="grid grid-cols-[11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem] gap-4 my-2">
                            <label htmlFor="grossMargin" className="asterisk-label">
                                {' '}
                                Gross Margin
                            </label>
                            <input
                                type="number"
                                id="marginJan"
                                name="marginJan"
                                value={formData.marginJan || ''}
                                placeholder="Jan"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="marginFeb"
                                name="marginFeb"
                                value={formData.marginFeb || ''}
                                placeholder="Feb"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="marginMar"
                                name="marginMar"
                                value={formData.marginMar || ''}
                                placeholder="Mar"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="marginApr"
                                name="marginApr"
                                value={formData.marginApr || ''}
                                placeholder="Apr"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="marginMay"
                                name="marginMay"
                                value={formData.marginMay || ''}
                                placeholder="May"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="marginJun"
                                name="marginJun"
                                value={formData.marginJun || ''}
                                placeholder="Jun"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="marginJul"
                                name="marginJul"
                                value={formData.marginJul || ''}
                                placeholder="Jul"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="marginAug"
                                name="marginAug"
                                value={formData.marginAug || ''}
                                placeholder="Aug"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="marginSep"
                                name="marginSep"
                                value={formData.marginSep || ''}
                                placeholder="Sep"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="marginOct"
                                name="marginOct"
                                value={formData.marginOct || ''}
                                placeholder="Oct"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="marginNov"
                                name="marginNov"
                                value={formData.marginNov || ''}
                                placeholder="Nov"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="marginDec"
                                name="marginDec"
                                value={formData.marginDec || ''}
                                placeholder="Dec"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="totalMarginCost"
                                name="totalMarginCost"
                                value={formData.totalMarginCost || ''}
                                placeholder="Total Sales"
                                onChange={inputChange}
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <h1 className="title-services">Cashflow Out</h1>
                        {(formData.cashflowOut || []).map((c, i) => (
                            <div className="grid grid-cols-[11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_2rem_2rem] gap-4 my-2">
                                <input
                                    type="text"
                                    id="item"
                                    name="item"
                                    value={c.item || ''}
                                    placeholder="Item"
                                    onChange={(e) => rowChangeCashflow(i, 'item', e.target.value)}
                                    className="form-input"
                                />

                                <input
                                    type="number"
                                    id="jan"
                                    name="jan"
                                    value={c.jan || ''}
                                    placeholder="Jan"
                                    onChange={(e) => rowChangeCashflow(i, 'jan', e.target.value)}
                                    className="form-input"
                                />

                                <input
                                    type="number"
                                    id="feb"
                                    name="feb"
                                    value={c.feb || ''}
                                    placeholder="Feb"
                                    onChange={(e) => rowChangeCashflow(i, 'feb', e.target.value)}
                                    className="form-input"
                                />

                                <input
                                    type="number"
                                    id="mar"
                                    name="mar"
                                    value={c.mar || ''}
                                    placeholder="Mar"
                                    onChange={(e) => rowChangeCashflow(i, 'mar', e.target.value)}
                                    className="form-input"
                                />

                                <input
                                    type="number"
                                    id="apr"
                                    name="apr"
                                    value={c.apr || ''}
                                    placeholder="Apr"
                                    onChange={(e) => rowChangeCashflow(i, 'apr', e.target.value)}
                                    className="form-input"
                                />

                                <input
                                    type="number"
                                    id="may"
                                    name="may"
                                    value={c.may || ''}
                                    placeholder="May"
                                    onChange={(e) => rowChangeCashflow(i, 'may', e.target.value)}
                                    className="form-input"
                                />

                                <input
                                    type="number"
                                    id="jun"
                                    name="jun"
                                    value={c.jun || ''}
                                    placeholder="Jun"
                                    onChange={(e) => rowChangeCashflow(i, 'jun', e.target.value)}
                                    className="form-input"
                                />

                                <input
                                    type="number"
                                    id="jul"
                                    name="jul"
                                    value={c.jul || ''}
                                    placeholder="Jul"
                                    onChange={(e) => rowChangeCashflow(i, 'jul', e.target.value)}
                                    className="form-input"
                                />

                                <input
                                    type="number"
                                    id="aug"
                                    name="aug"
                                    value={c.aug || ''}
                                    placeholder="Aug"
                                    onChange={(e) => rowChangeCashflow(i, 'aug', e.target.value)}
                                    className="form-input"
                                />

                                <input
                                    type="number"
                                    id="sep"
                                    name="sep"
                                    value={c.sep || ''}
                                    placeholder="Sep"
                                    onChange={(e) => rowChangeCashflow(i, 'sep', e.target.value)}
                                    className="form-input"
                                />

                                <input
                                    type="number"
                                    id="oct"
                                    name="oct"
                                    value={c.oct || ''}
                                    placeholder="Oct"
                                    onChange={(e) => rowChangeCashflow(i, 'oct', e.target.value)}
                                    className="form-input"
                                />

                                <input
                                    type="number"
                                    id="nov"
                                    name="nov"
                                    value={c.nov || ''}
                                    placeholder="Nov"
                                    onChange={(e) => rowChangeCashflow(i, 'nov', e.target.value)}
                                    className="form-input"
                                />

                                <input
                                    type="number"
                                    id="dec"
                                    name="dec"
                                    value={c.dec || ''}
                                    placeholder="Dec"
                                    onChange={(e) => rowChangeCashflow(i, 'dec', e.target.value)}
                                    className="form-input"
                                />

                                <input
                                    type="number"
                                    id="totalCashflowOut"
                                    name="totalCashflowOut"
                                    value={c.totalCashflowOut || ''}
                                    placeholder="Total Sales"
                                    onChange={inputChange}
                                    className="form-input"
                                />

                                <button type="button" onClick={addRow}>
                                    <PlusCircleIcon className="h-8 w-8 text-blue-500 cursor-pointer" />
                                </button>

                                <button type="button" onClick={(e) => deleteRow(i, e.target)}>
                                    <MinusCircleIcon className="h-8 w-8 text-blue-500 cursor-pointer" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-[11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem] gap-4 my-2">
                        <label htmlFor="StaffingNiPensions" className="asterisk-label">
                            {' '}
                            Staffing/NI/Pensions
                        </label>
                        <input
                            type="number"
                            id="staffJan"
                            name="staffJan"
                            value={formData.staffJan || ''}
                            placeholder="Jan"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="staffFeb"
                            name="staffFeb"
                            value={formData.staffFeb || ''}
                            placeholder="Feb"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="staffMar"
                            name="staffMar"
                            value={formData.staffMar || ''}
                            placeholder="Mar"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="staffApr"
                            name="staffApr"
                            value={formData.staffApr || ''}
                            placeholder="Apr"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="staffMay"
                            name="staffMay"
                            value={formData.staffMay || ''}
                            placeholder="May"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="staffJun"
                            name="staffJun"
                            value={formData.staffJun || ''}
                            placeholder="Jun"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="staffJul"
                            name="staffJul"
                            value={formData.staffJul || ''}
                            placeholder="Jul"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="staffAug"
                            name="staffAug"
                            value={formData.staffAug || ''}
                            placeholder="Aug"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="staffSep"
                            name="staffSep"
                            value={formData.staffSep || ''}
                            placeholder="Sep"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="staffOct"
                            name="staffOct"
                            value={formData.staffOct || ''}
                            placeholder="Oct"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="staffNov"
                            name="staffNov"
                            value={formData.staffNov || ''}
                            placeholder="Nov"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="staffDec"
                            name="staffDec"
                            value={formData.staffDec || ''}
                            placeholder="Dec"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="totalStaffCost"
                            name="totalStaffCost"
                            value={formData.totalStaffCost || ''}
                            placeholder="Total Staffing/NI/Pensions"
                            onChange={inputChange}
                            className="form-input"
                        />
                    </div>

                    <div className="grid grid-cols-[11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem] gap-4 my-2">
                        <label htmlFor="expenses" className="asterisk-label">
                            {' '}
                            Expenses
                        </label>
                        <input
                            type="number"
                            id="expensesJan"
                            name="expensesJan"
                            value={formData.expensesJan || ''}
                            placeholder="Jan"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="expensesFeb"
                            name="expensesFeb"
                            value={formData.expensesFeb || ''}
                            placeholder="Feb"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="expensesMar"
                            name="expensesMar"
                            value={formData.expensesMar || ''}
                            placeholder="Mar"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="expensesApr"
                            name="expensesApr"
                            value={formData.expensesApr || ''}
                            placeholder="Apr"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="expensesMay"
                            name="expensesMay"
                            value={formData.expensesMay || ''}
                            placeholder="May"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="expensesJun"
                            name="expensesJun"
                            value={formData.expensesJun || ''}
                            placeholder="Jun"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="expensesJul"
                            name="expensesJul"
                            value={formData.expensesJul || ''}
                            placeholder="Jul"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="expensesAug"
                            name="expensesAug"
                            value={formData.expensesAug || ''}
                            placeholder="Aug"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="expensesSep"
                            name="expensesSep"
                            value={formData.expensesSep || ''}
                            placeholder="Sep"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="expensesOct"
                            name="expensesOct"
                            value={formData.expensesOct || ''}
                            placeholder="Oct"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="expensesNov"
                            name="expensesNov"
                            value={formData.expensesNov || ''}
                            placeholder="Nov"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="expensesDec"
                            name="expensesDec"
                            value={formData.expensesDec || ''}
                            placeholder="Dec"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="totalExpensesCost"
                            name="totalExpensesCost"
                            value={formData.totalExpensesCost || ''}
                            placeholder="Total Expenses"
                            onChange={inputChange}
                            className="form-input"
                        />
                    </div>

                    <div className="grid grid-cols-[11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem] gap-4 my-2">
                        <label htmlFor="netMovement" className="asterisk-label">
                            {' '}
                            Net Movement
                        </label>
                        <input
                            type="number"
                            id="netJan"
                            name="netJan"
                            value={formData.netJan || ''}
                            placeholder="Jan"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="netFeb"
                            name="netFeb"
                            value={formData.netFeb || ''}
                            placeholder="Feb"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="netMar"
                            name="netMar"
                            value={formData.netMar || ''}
                            placeholder="Mar"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="netApr"
                            name="netApr"
                            value={formData.netApr || ''}
                            placeholder="Apr"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="netMay"
                            name="netMay"
                            value={formData.netMay || ''}
                            placeholder="May"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="netJun"
                            name="netJun"
                            value={formData.netJun || ''}
                            placeholder="Jun"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="netJul"
                            name="netJul"
                            value={formData.netJul || ''}
                            placeholder="Jul"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="netAug"
                            name="netAug"
                            value={formData.netAug || ''}
                            placeholder="Aug"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="netSep"
                            name="netSep"
                            value={formData.netSep || ''}
                            placeholder="Sep"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="netOct"
                            name="netOct"
                            value={formData.netOct || ''}
                            placeholder="Oct"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="netNov"
                            name="netNov"
                            value={formData.netNov || ''}
                            placeholder="Nov"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="netDec"
                            name="netDec"
                            value={formData.netDec || ''}
                            placeholder="Dec"
                            onChange={inputChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            id="totalNetCost"
                            name="totalNetCost"
                            value={formData.totalNetCost || ''}
                            placeholder="Total Net"
                            onChange={inputChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-section">
                        <h1 className="title-services">Balances</h1>
                        <div className="grid grid-cols-[11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem] gap-4 my-2">
                            <label className="asterisk-label">Opening Balance</label>

                            <input
                                type="number"
                                id="openingJan"
                                name="openingJan"
                                value={formData.openingJan || ''}
                                placeholder="Jan"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="openingFeb"
                                name="openingFeb"
                                value={formData.openingFeb || ''}
                                placeholder="Feb"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="openingMar"
                                name="openingMar"
                                value={formData.openingMar || ''}
                                placeholder="Mar"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="openingApr"
                                name="openingApr"
                                value={formData.openingApr || ''}
                                placeholder="Apr"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="openingMay"
                                name="openingMay"
                                value={formData.openingMay || ''}
                                placeholder="May"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="openingJun"
                                name="openingJun"
                                value={formData.openingJun || ''}
                                placeholder="Jun"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="openingJul"
                                name="openingJul"
                                value={formData.openingJul || ''}
                                placeholder="Jul"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="openingAug"
                                name="openingAug"
                                value={formData.openingAug || ''}
                                placeholder="Aug"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="openingSep"
                                name="openingSep"
                                value={formData.openingSep || ''}
                                placeholder="Sep"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="openingOct"
                                name="openingOct"
                                value={formData.openingOct || ''}
                                placeholder="Oct"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="openingNov"
                                name="openingNov"
                                value={formData.openingNov || ''}
                                placeholder="Nov"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="openingDec"
                                name="openingDec"
                                value={formData.openingDec || ''}
                                placeholder="Dec"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="totalOpeningCost"
                                name="totalOpeningCost"
                                value={formData.totalOpeningCost || ''}
                                placeholder="Total Opening"
                                onChange={inputChange}
                                className="form-input"
                            />
                        </div>

                        <div className="grid grid-cols-[11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem_11.25rem] gap-4 my-2">
                            <label className="asterisk-label">Closing Balance</label>

                            <input
                                type="number"
                                id="closingJan"
                                name="closingJan"
                                value={formData.closingJan || ''}
                                placeholder="Jan"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="closingFeb"
                                name="closingFeb"
                                value={formData.closingFeb || ''}
                                placeholder="Feb"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="closingMar"
                                name="closingMar"
                                value={formData.closingMar || ''}
                                placeholder="Mar"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="closingApr"
                                name="closingApr"
                                value={formData.closingApr || ''}
                                placeholder="Apr"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="closingMay"
                                name="closingMay"
                                value={formData.closingMay || ''}
                                placeholder="May"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="closingJun"
                                name="closingJun"
                                value={formData.closingJun || ''}
                                placeholder="Jun"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="closingJul"
                                name="closingJul"
                                value={formData.closingJul || ''}
                                placeholder="Jul"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="closingAug"
                                name="closingAug"
                                value={formData.closingAug || ''}
                                placeholder="Aug"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="closingSep"
                                name="closingSep"
                                value={formData.closingSep || ''}
                                placeholder="Sep"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="closingOct"
                                name="closingOct"
                                value={formData.closingOct || ''}
                                placeholder="Oct"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="closingNov"
                                name="closingNov"
                                value={formData.closingNov || ''}
                                placeholder="Nov"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="closingDec"
                                name="closingDec"
                                value={formData.closingDec || ''}
                                placeholder="Dec"
                                onChange={inputChange}
                                className="form-input"
                            />

                            <input
                                type="number"
                                id="totalClosingCost"
                                name="totalClosingCost"
                                value={formData.totalClosingCost || ''}
                                placeholder="Total Closing"
                                onChange={inputChange}
                                className="form-input"
                            />
                        </div>
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
