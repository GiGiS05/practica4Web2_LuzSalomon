import { useContext } from 'react'
import { AmountDisplay } from './AmountDisplay'
import { BudgetDispatchContext, BudgetStateContext } from '../context/BudgetContext'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const BudgetTracker = () => {
    const state = useContext(BudgetStateContext);
    const dispatch = useContext(BudgetDispatchContext);
    
    const totalExpenses = state.expenses.reduce((total, expense)=>expense.amount+total,0);
    const remainingBudget=state.budget-totalExpenses;
    
    const percentage = ((totalExpenses/state.budget)*100).toFixed(2)

    return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
            value={percentage} // Valor del progreso (0 - 100)
            text={`${percentage}%`} // Texto que se muestra dentro del círculo, en este caso el porcentaje
            styles={buildStyles({
                pathColor: (percentage < 100) ? '#3b82f6' : '#dc2626', // Color de la barra: azul si es menor a 100%, rojo si es 100%
                trailColor: '#F5F5F5' // Color del fondo de la barra (trayectoria no completada)
            })}
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
          className='bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg'
          onClick={()=>dispatch({type:"reset-app"})}
        >
          Resetear app
        </button>

        <AmountDisplay amount={state.budget} label="Presupuesto" />
        <AmountDisplay amount={remainingBudget} label="Disponible" />
        <AmountDisplay amount={totalExpenses} label="Gastado" />
      </div>

    </div>
  )
}