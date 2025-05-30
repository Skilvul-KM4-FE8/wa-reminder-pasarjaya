"use client"

import { useCreateCustomerModal } from "../hooks/use-create-customer-moda"

export const CreateCustomerModal = () => {
  const { isOpen, setIsOpen, close } = useCreateCustomerModal()

  return (
    <ResponsiveModal>
      <CreateCustomerForm onCalcel={close} />
    </ResponsiveModal>
  )
}