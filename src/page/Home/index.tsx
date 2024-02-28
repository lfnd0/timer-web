import { zodResolver } from '@hookform/resolvers/zod'
import { Play } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
} from './styles'

const newCycleFormValidationSchema = z.object({
  task: z.string().min(1, 'Informe um título para a tarefa'),
  minutesAmount: z
    .number()
    .min(5, 'O ciclo não pode ser menor que 5 minutos')
    .max(60, 'O ciclo não pode ser maior que 60 minutos'),
})

export function Home() {
  const { register, handleSubmit, watch } = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
  })

  const task = watch('task')
  const isSubmitDisabled = !task

  function handleCreateNewCycle(data: unknown) {
    console.log(data)
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <datalist id="task-suggestions">
            <option value="Ignite ReactJS" />
            <option value="Full Cycle 3.0" />
            <option value="Rabiscando Padrões de Projeto" />
            <option value="Arquitetura Limpa na Prática" />
          </datalist>

          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            id="minutesAmount"
            type="number"
            step={5}
            min={5}
            max={60}
            defaultValue={5}
            placeholder="00"
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountDownButton disabled={isSubmitDisabled} type="submit">
          <Play />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
