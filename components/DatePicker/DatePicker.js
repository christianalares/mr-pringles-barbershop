import { forwardRef } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import enGb from 'date-fns/locale/en-GB'
import { startOfToday } from 'date-fns'
import cn from 'clsx'
import Input from '../Input/Input'
import styles from './DatePicker.module.scss'
import 'react-datepicker/dist/react-datepicker.css'

registerLocale('en-gb', enGb)

const MyDatePicker = ({
  field,
  form,
  placeholder,
  transformDate,
  className,
  selected,
  size,
  onChange,
  ...restProps
}) => {
  const handleChange =
    typeof onChange === 'function'
      ? onChange
      : date => {
          const transformedDate = typeof transformDate === 'function' ? transformDate(date) : date
          form.setFieldValue(field.name, transformedDate)
        }

  const selectedValue = selected || (field?.value ? new Date(field.value) : null)

  return (
    <DatePicker
      locale="en-gb"
      selected={selectedValue}
      onChange={handleChange}
      customInput={<CustomDatePickerField customPlaceholder={placeholder} size={size} />}
      wrapperClassName={cn(styles.datePickerWrapper, {
        [className]: !!className,
      })}
      showPopperArrow={false}
      fixedHeight
      {...restProps}
    />
  )
}

const CustomDatePickerField = forwardRef(({ customPlaceholder, ...restProps }, ref) => {
  return <Input ref={ref} {...restProps} placeholder={customPlaceholder} readOnly />
})

export default MyDatePicker
