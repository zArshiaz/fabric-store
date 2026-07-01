import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/fa';

export function persianTitle(date: Date) {

    try {
        const fmt = new Intl.DateTimeFormat('fa', {
            weekday:'short',
            year:'numeric',
            month:'numeric',
            day:'numeric'
            // hour: '2-digit',
            // minute: '2-digit',
            // hour12: false,
            // timeZone: 'Asia/Tehran'
        });
        return fmt.format(date);
    } catch {
        // return dayjs(date).format('YYYY/MM/DD');
    }
}

export default function Day({date, className}: { date: string | number | Date, className?: string }) {
    dayjs.extend(relativeTime);
    dayjs.locale('fa');
    const d = dayjs(date);
    if (!d.isValid()) return <span>—</span>;
    return (
        <time className={className} dateTime={d.toISOString()} title={persianTitle(d.toDate())}>
            {d.fromNow()}
        </time>
    );
}
