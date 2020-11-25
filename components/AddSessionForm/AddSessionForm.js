import { useState, useEffect, useRef } from 'react'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { FiPlus } from 'react-icons/fi'
import { FaRegTrashAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
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
import Input from '../Input/Input'
import Button from '../Button/Button'
import Emoji from '../Emoji/Emoji'
import Error from '../Error/Error'
import styles from './AddSessionForm.module.scss'
import 'react-datepicker/dist/react-datepicker.css'
import ButtonAsLink from '../ButtonAsLink/ButtonAsLink'

const cutEmojis = ['💇‍♂️', '💇🏻‍♂️', '💇🏼‍♂️', '💇🏽‍♂️', '💇🏾‍♂️', '💇🏿‍♂️']

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

  const handleSubmit = () => {
    console.log('submit!')
  }

  return (
    <div className={styles.addSessionForm}>
      <h1>
        <Emoji symbol={getOneRandomOf(cutEmojis)} label="Man getting a hair cut" /> Add session
      </h1>
      <Formik
        initialValues={{
          day: null,
          slots: getDefaultSlots(),
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue, errors }) =>
          console.log('errors', errors) || (
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
                        .map((time, i) => {
                          return (
                            <motion.li key={time.from} layout>
                              <span>{`${getTimeEmoji(time.from)} ${time.from} - ${time.to}`}</span>
                              <button
                                type="button"
                                className={styles.removeButton}
                                onClick={() => arrayHelpers.remove(i)}
                                aria-label={`Remove slot ${time.from} to ${time.to}`}
                              >
                                <FaRegTrashAlt />
                              </button>
                            </motion.li>
                          )
                        })}
                    </motion.ul>
                  )}
                </FieldArray>
              ) : null}

              {values.slots.length === 0 ? (
                <p className={styles.addTimeSlotsMessage}>
                  <Emoji label="Finger poining down" symbol="👇" /> Add some time slots or{' '}
                  <ButtonAsLink onClick={() => setFieldValue('slots', getDefaultSlots())}>
                    populate som defaults
                  </ButtonAsLink>
                </p>
              ) : null}

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
                  <Button type="submit">Create session</Button>
                  <Button secondary type="button" onClick={closeModal}>
                    Cancel
                  </Button>
                </div>
              ) : null}
              {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
            </Form>
          )
        }
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

          <Input
            className={styles.to}
            value={timeFrom ? format(addMinutes(timeFrom, 30), 'HH:mm') : ''}
            placeholder="To"
            readOnly
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

const AddTime = ({ add, day, currentTimes }) => {
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const [error, setError] = useState(null)

  const hourRef = useRef()
  const minuteRef = useRef()
  const buttonRef = useRef()

  const handleAdd = () => {
    const chosenTime = getSlotAt(day, `${hour}:${minute}`)

    const allStartTimes = currentTimes.map(startTime => startTime.from)

    if (allStartTimes.includes(chosenTime.from)) {
      setError(`${hour}:${minute} is already added`)
    } else {
      add(chosenTime)
      hourRef.current.focus()
      setHour('')
      setMinute('')
      setError(null)
    }
  }

  return (
    <div className={styles.addTimeWrapper}>
      <div className={styles.formElemenrs}>
        <div className={styles.hoursMinutes}>
          <Input
            ref={hourRef}
            size="s"
            type="number"
            value={hour}
            onChange={e => {
              setHour(e.target.value)
              if (e.target.value.length === 2) {
                minuteRef.current.focus()
              }
            }}
            placeholder="HH"
          />
          <span>:</span>
          <Input
            ref={minuteRef}
            size="s"
            type="number"
            value={minute}
            onChange={e => {
              setMinute(e.target.value)
              if (e.target.value.length === 2) {
                buttonRef.current.focus()
              }
            }}
            placeholder="mm"
          />
        </div>
        <Button ref={buttonRef} icon={FiPlus} secondary size="s" type="button" onClick={handleAdd}>
          Add
        </Button>
      </div>
      <Error show={!!error} message={error} className={styles.errorMessage} />
    </div>
  )
}

export default AddSessionForm
