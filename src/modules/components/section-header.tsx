import { Text, Title } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import * as styles from './styles.css';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: { label: string; href: string };
  right?: React.ReactNode;
}

export default function SectionHeader({
  title,
  subtitle,
  action,
  right,
}: SectionHeaderProps) {
  return (
    <div className={styles.sectionHeader}>
      <div>
        <Title order={2} fz={26} style={{ letterSpacing: -0.5 }}>
          {title}
        </Title>
        {subtitle && (
          <Text c="dimmed" mt={4}>
            {subtitle}
          </Text>
        )}
      </div>
      {right}
      {action && (
        <Link href={action.href} className={styles.sectionLink}>
          {action.label}
        </Link>
      )}
    </div>
  );
}
