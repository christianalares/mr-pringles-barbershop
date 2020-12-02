import { useState } from 'react'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { FiPlus } from 'react-icons/fi'
import { FaRegTrashAlt } from 'react-icons/fa'
import { AiOutlineStop } from 'react-icons/ai'
import { motion, AnimatePresence } from 'framer-motion'
import {
  set,
  addMinutes,
  format,
  getTime,
  startOfToday,
  endOfDay,
  startOfDay,
  isToday,
} from 'date-fns'
import DatePicker from '../DatePicker/DatePicker'
import getOneRandomOf from '../../utils/getOneRandomOf'
import getTimeEmoji from '../../utils/getTimeEmoji'
import useSessions from '../../utils/hooks/useSessions'
import Input from '../Input/Input'
import Button from '../Button/Button'
import Emoji from '../Emoji/Emoji'
import Error from '../Error/Error'
import ButtonAsLink from '../ButtonAsLink/ButtonAsLink'
import styles from './AddSessionForm.module.scss'
import 'react-datepicker/dist/react-datepicker.css'

const cutEmojis = ['💇‍♂️', '💇🏻‍♂️', '💇🏼‍♂️', '💇🏽‍♂️', '💇🏾‍♂️', '💇🏿‍♂️']

const slideDownUp = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: 'auto' },
  exit: { opacity: 0, height: 0 },
}

const getDefaultSlots = () => [
  {
    from: '15:30',
    to: '16:00',
  },
  {
    from: '16:00',
    to: '16:30',
  },
  {
    from: '16:30',
    to: '17:00',
  },
  {
    from: '17:00',
    to: '17:30',
  },
  {
    from: '17:30',
    to: '18:00',
  },
  {
    from: '18:00',
    to: '18:30',
  },
  {
    from: '18:30',
    to: '19:00',
  },
]

const AddSessionForm = ({ closeModal }) => {
  const { add } = useSessions()

  const validationSchema = yup.object().shape({
    day: yup.string().nullable().required('Hey, you need to set a day!'),
    slots: yup
      .array()
      .of(
        yup.object().shape({
          from: yup.string(),
          to: yup.string(),
        })
      )
      .required()
      .min(3, 'You need at least 3 slots'),
  })

  const handleSubmit = async values => {
    await add(values)
    closeModal()
  }

  return (
    <div className={styles.addSessionForm}>
      <h1>
        <Emoji symbol={getOneRandomOf(cutEmojis)} label="Man getting a hair cut" /> Add session
      </h1>
      <Formik
        initialValues={{
          day: null,
          slots: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <Field
              name="day"
              component={DatePicker}
              placeholder="Pick a day!"
              className={styles.datePicker}
              dateFormat="MMMM d"
              transformDate={date => format(date, 'yyyy-MM-dd')}
              minDate={startOfToday(new Date())}
            />
            {!values.day ? (
              <p>
                <Emoji label="Finger poining up" symbol="👆" /> First, pick a day.
              </p>
            ) : null}

            {values.day && values.slots.length > 0 ? (
              <FieldArray name="slots">
                {arrayHelpers => (
                  <motion.ul className={styles.timeList} layout>
                    <AnimatePresence>
                      {values.slots
                        .sort((a, b) => {
                          const aFrom = getTime(
                            set(new Date(values.day), {
                              hours: a.from.split(':')[0],
                              minutes: a.from.split(':')[1],
                              seconds: 0,
                              milliseconds: 0,
                            })
                          )

                          const bFrom = getTime(
                            set(new Date(values.day), {
                              hours: b.from.split(':')[0],
                              minutes: b.from.split(':')[1],
                              seconds: 0,
                              milliseconds: 0,
                            })
                          )

                          return aFrom - bFrom
                        })
                        .map((slot, i) => {
                          return (
                            <motion.li key={slot.from} {...slideDownUp}>
                              <div className={styles.inner}>
                                <span>{`${getTimeEmoji(slot.from)} ${slot.from} - ${
                                  slot.to
                                }`}</span>
                                <button
                                  type="button"
                                  className={styles.removeButton}
                                  onClick={() => arrayHelpers.remove(i)}
                                  aria-label={`Remove slot ${slot.from} to ${slot.to}`}
                                >
                                  <FaRegTrashAlt />
                                </button>
                              </div>
                            </motion.li>
                          )
                        })}
                    </AnimatePresence>
                  </motion.ul>
                )}
              </FieldArray>
            ) : null}

            {values.slots.length === 0 && !!values.day && (
              <AnimatePresence>
                <motion.p className={styles.addTimeSlotsMessage} {...slideDownUp}>
                  <Emoji label="Finger poining down" symbol="👇" /> Add slots or{' '}
                  <ButtonAsLink onClick={() => setFieldValue('slots', getDefaultSlots())}>
                    populate some defaults
                  </ButtonAsLink>
                </motion.p>
              </AnimatePresence>
            )}

            {values.day ? (
              <FieldArray name="slots">
                {({ push }) => (
                  <TimePicker addSlot={push} day={values.day} currentSlots={values.slots} />
                )}
              </FieldArray>
            ) : null}

            <ErrorMessage className={styles.errorMessage} component={Error} name="day" />
            <ErrorMessage className={styles.errorMessage} component={Error} name="slots" />

            {values.day ? (
              <div className={styles.ctas}>
                <Button type="submit" icon={FiPlus} loading={isSubmitting}>
                  Create
                </Button>
                <Button type="button" secondary icon={AiOutlineStop} onClick={closeModal}>
                  Cancel
                </Button>
              </div>
            ) : null}
          </Form>
        )}
      </Formik>
    </div>
  )
}

const TimePicker = ({ addSlot, day, currentSlots }) => {
  const [timeFrom, setTimeFrom] = useState(null)
  const [error, setError] = useState(null)

  const handleAdd = () => {
    const from = format(timeFrom, 'HH:mm')
    const to = format(addMinutes(timeFrom, 30), 'HH:mm')

    const allStartTimes = currentSlots.map(startTime => startTime.from)

    if (allStartTimes.includes(from)) {
      setError(`${from} is already added`)
    } else {
      addSlot({ from, to })
      setError(null)
      setTimeFrom(null)
    }
  }

  const excludedTimes = currentSlots.map(slot =>
    set(new Date(day), {
      hours: slot.from.split(':')[0],
      minutes: slot.from.split(':')[1],
      seconds: 0,
      milliseconds: 0,
    })
  )

  return (
    <div className={styles.timePicker}>
      <div className={styles.formElements}>
        <div className={styles.inputs}>
          <DatePicker
            className={styles.from}
            selected={timeFrom}
            minTime={isToday(new Date(day)) ? new Date() : startOfDay(new Date(day))}
            maxTime={endOfDay(new Date(day))}
            excludeTimes={excludedTimes}
            showTimeSelect
            showTimeSelectOnly
            dateFormat="HH:mm"
            onChange={date => setTimeFrom(date)}
            placeholder="From"
            size="s"
          />
          -
          <Input
            className={styles.to}
            value={timeFrom ? format(addMinutes(timeFrom, 30), 'HH:mm') : ''}
            placeholder="To"
            disabled
            size="s"
          />
        </div>

        <Button icon={FiPlus} type="button" onClick={handleAdd} size="s" secondary>
          Add
        </Button>
      </div>

      <Error show={!!error} message={error} className={styles.errorMessage} />
    </div>
  )
}

export default AddSessionForm
