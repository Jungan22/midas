'use client'

import styles from './Accordion.module.css'
import * as React from 'react'
import clsx from 'clsx'
import { DisclosureGroup, DisclosureGroupProps } from 'react-aria-components'
import { AccordionContext } from './AccordionContext'

export const ACCORDION_TEST_ID = 'accordion'

export interface MidasAccordion extends DisclosureGroupProps {
  children?: React.ReactNode
  isDisabled?: boolean
  isContained?: boolean
}

/**
 * Accordions help reduce visual clutter on a page by organizing content into collapsible sections.
 */

export const Accordion: React.FC<MidasAccordion> = ({
  variant,
  children,
  className,
  isContained: isContainedFromProp,
  ...props
}) => {
  const isContained = isContainedFromProp || variant === 'contained'
  return (
    <AccordionContext.Provider value={{ isContained }}>
      <DisclosureGroup
        data-testid={ACCORDION_TEST_ID}
        className={clsx(
          styles.root,
          isContained ? styles.contained : styles.uncontained,
          className,
        )}
        {...props}
      >
        {children}
      </DisclosureGroup>
    </AccordionContext.Provider>
  )
}
