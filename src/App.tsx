import AGgRightClick from './components/AGgRightClick'
// import AGLocalSave from './components/AGLocalSave'
import Example1 from './components/Example1'
import Example2 from './components/Example2'
import Example3 from './components/Example3'
import Example4 from './components/Example4'
import ExampleWithError from './components/ExampleWithError'
import ExampleWithRowClass from './components/ExampleWithRowClass'
import OrderSummary from './components/OrderSummery'
import TestComponent from './components/TestComponent'

export default function App() {
  return (
    <div style={{maxWidth: '1000px', margin: 'auto'}}>

      <TestComponent />

      <OrderSummary />
      <br />
      <hr />
      <br />

      <AGgRightClick />
      {/* <AGLocalSave /> */}
      <Example1 />

      <br />
      <hr />
      <br />


      <Example2 />

      <br />
      <hr />
      <br />

      <Example3 />

      <br />
      <hr />
      <br />

      <Example4 />

      <br />
      <hr />
      <br />
      <ExampleWithError />


      <br />
      <hr />
      <br />

      <ExampleWithRowClass />
    </div>
  )
}
