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
    startTime: '15:30',
    endTime: '16:00',
  },
  {
    startTime: '16:00',
    endTime: '16:30',
  },
  {
    startTime: '16:30',
    endTime: '17:00',
  },
  {
    startTime: '17:00',
    endTime: '17:30',
  },
  {
    startTime: '17:30',
    endTime: '18:00',
  },
  {
    startTime: '18:00',
    endTime: '18:30',
  },
  {
    startTime: '18:30',
    endTime: '19:00',
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
          startTime: yup.string().required(),
          endTime: yup.string().required(),
        })
      )
      .required()
      .min(3, 'You need at least 3 slots'),
  })

  const handleSubmit = async (values, { setFieldError }) => {
    // Manually checking for empty array, couldn't get `.min(3)` to reject empty array
    if (values.slots.length === 0) {
      setFieldError('slots', 'You need at least 3 slots')
    } else {
      await add(values)
      closeModal()
    }
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
                              hours: a.startTime.split(':')[0],
                              minutes: a.startTime.split(':')[1],
                              seconds: 0,
                              milliseconds: 0,
                            })
                          )

                          const bFrom = getTime(
                            set(new Date(values.day), {
                              hours: b.startTime.split(':')[0],
                              minutes: b.startTime.split(':')[1],
                              seconds: 0,
                              milliseconds: 0,
                            })
                          )

                          return aFrom - bFrom
                        })
                        .map((slot, i) => {
                          return (
                            <motion.li key={slot.startTime} {...slideDownUp}>
                              <div className={styles.inner}>
                                <span>{`${getTimeEmoji(slot.startTime)} ${slot.startTime} - ${
                                  slot.endTime
                                }`}</span>
                                <button
                                  type="button"
                                  className={styles.removeButton}
                                  onClick={() => arrayHelpers.remove(i)}
                                  aria-label={`Remove slot ${slot.startTime} to ${slot.endTime}`}
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
  const [timeStart, setTimeStart] = useState(null)
  const [error, setError] = useState(null)

  const handleAdd = () => {
    if (!timeStart) {
      return
    }

    const start = format(timeStart, 'HH:mm')
    const end = format(addMinutes(timeStart, 30), 'HH:mm')

    const allStartTimes = currentSlots.map(startTime => startTime.startTime)

    if (allStartTimes.includes(start)) {
      setError(`${start} is already added`)
    } else {
      addSlot({ startTime: start, endTime: end })
      setError(null)
      setTimeStart(null)
    }
  }

  const excludedTimes = currentSlots.map(slot =>
    set(new Date(day), {
      hours: slot.startTime.split(':')[0],
      minutes: slot.startTime.split(':')[1],
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
            selected={timeStart}
            minTime={isToday(new Date(day)) ? new Date() : startOfDay(new Date(day))}
            maxTime={endOfDay(new Date(day))}
            excludeTimes={excludedTimes}
            showTimeSelect
            showTimeSelectOnly
            dateFormat="HH:mm"
            onChange={date => setTimeStart(date)}
            placeholder="From"
            size="s"
          />
          -
          <Input
            className={styles.to}
            value={timeStart ? format(addMinutes(timeStart, 30), 'HH:mm') : ''}
            placeholder="To"
            disabled
            size="s"
          />
        </div>

        <Button
          disabled={!timeStart}
          icon={FiPlus}
          type="button"
          onClick={handleAdd}
          size="s"
          secondary
        >
          Add
        </Button>
      </div>

      <Error show={!!error} message={error} className={styles.errorMessage} />
    </div>
  )
}

export default AddSessionForm
