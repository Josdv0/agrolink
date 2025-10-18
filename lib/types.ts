export type MachineryType = "tractor" | "cosechadora" | "sembradora" | "pulverizador" | "otro"
export type MachineryCondition = "nuevo" | "usado" | "excelente" | "bueno" | "regular"
export type TransactionType = "venta" | "renta"
export type PublicationStatus = "pendiente" | "aprobada" | "rechazada"

export interface Machinery {
  id: string
  title: string
  description: string
  type: MachineryType
  condition: MachineryCondition
  transactionType: TransactionType
  price: number
  location: string
  imageUrl: string
  ownerId: string
  ownerName: string
  status: PublicationStatus
  createdAt: Date
  brand?: string
  model?: string
  year?: number
}

export interface Reservation {
  id: string
  machineryId: string
  machineryTitle: string
  userId: string
  userName: string
  startDate: Date
  endDate?: Date
  totalPrice: number
  status: "pendiente" | "confirmada" | "completada" | "cancelada"
  createdAt: Date
}
