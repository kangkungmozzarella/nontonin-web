import { Text, Title } from '@mantine/core';
import { ArrowRight } from '@phosphor-icons/react';
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
        <Title order={2} fz={28} style={{ letterSpacing: -0.4 }}>
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
        <Link href={action.href}>
          <Text
            c="mint"
            fw={600}
            size="sm"
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            {action.label} <ArrowRight size={14} />
          </Text>
        </Link>
      )}
    </div>
  );
}
