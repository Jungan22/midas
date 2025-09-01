'use client'

import * as React from 'react'
import styles from './RoundButton.module.css'
import {
  Button as AriaButton,
  ButtonProps,
  ButtonRenderProps,
} from 'react-aria-components'
import clsx from 'clsx'
import { LucideIcon } from 'lucide-react'
import { Size } from '../common/types'

export interface MidasRoundButtonProps {
  /**
   * Round button variant for different use cases
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger'
  /** Component size (large: 48px diameter, medium: 40px diameter)
   *  @default 'large'
   **/
  size?: Size
  /** Add an icon from lucide-react
   *
   * @see {@link https://lucide.dev/icons/|Lucide}
   */
  icon?: LucideIcon
  /**
   * Adjust icon size
   *  @default 20
   * */
  iconSize?: number
  children?:
    | React.ReactNode
    | ((
        values: ButtonRenderProps & {
          defaultChildren: React.ReactNode | undefined
        },
      ) => React.ReactNode)
    | string
}

export type MidasRoundButton = MidasRoundButtonProps & ButtonProps

/**
 * Round button component that displays a yellow halo when pressed.
 * Perfect for floating action buttons or icon-only interactions.
 *
 * @interface MidasRoundButton
 *
 * @see {@link https://designsystem.migrationsverket.se/components/button}
 */

export const RoundButton: React.FC<MidasRoundButton> = ({
  variant = 'primary',
  className,
  size = 'large',
  icon: IconComponent,
  iconSize,
  ...rest
}) => {
  return (
    <AriaButton
      className={clsx(
        styles.roundButton,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'tertiary' && styles.tertiary,
        variant === 'danger' && styles.danger,
        size === 'medium' && styles.medium,
        className,
      )}
      {...rest}
    >
      <>
        {IconComponent && <IconComponent aria-hidden size={iconSize ?? 20} />}
        {rest.children}
      </>
    </AriaButton>
  )
}