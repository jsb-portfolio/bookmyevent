import type { FieldErrors } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { FaExclamationCircle } from 'react-icons/fa'

export default function FormInputError({
  name,
  errors,
}: {
  name: string
  errors: FieldErrors
}) {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => (
        <div className="dropdown dropdown-right dropdown-hover">
          <div
            tabIndex={0}
            role="button"
            className="text-error text-lg">
            <FaExclamationCircle />
          </div>
          <div
            className="card compact dropdown-content bg-error text-error-content rounded-box z-[1] w-max max-w-64 shadow">
            <div className="card-body !p-2">
              {message}
            </div>
          </div>
        </div>
      )}
    />
  )
}
