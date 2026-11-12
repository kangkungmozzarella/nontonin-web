import Link from 'next/link';
import { buildUrl, NavigationRoutes } from 'common/routes';
import type { ShowtimeModel } from 'api-hooks/showtimes/model';
import * as styles from './styles.css';

export default function ShowtimeChips({
  showtimes,
}: {
  showtimes: ShowtimeModel[];
}) {
  return (
    <div className={styles.timeGrid}>
      {showtimes.map((s) =>
        s.isPast ? (
          <span
            key={s.id}
            className={styles.timeChip}
            data-disabled="true"
            aria-disabled
          >
            {s.time}
          </span>
        ) : (
          <Link
            key={s.id}
            href={buildUrl(NavigationRoutes.Seat, {
              paths: { showtimeId: s.id },
            })}
            className={styles.timeChip}
          >
            {s.time}
          </Link>
        ),
      )}
    </div>
  );
}
