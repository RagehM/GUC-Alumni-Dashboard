import { Cell, Legend, PieChart, Pie } from "recharts";

function EmploymentRateMales(props) {
  const backendData = props.response;
  let EmploymentRate = 0;
  const data = [
    {
      name: 'Employed Males',
      value: backendData.males.countOfEmployedGraduates
    },
    {
      name: 'Unknown',
      value: backendData.males.countOfUnEmployedGraduates
    }
  ];
  if (backendData.males.countOfEmployedGraduates + backendData.males.countOfUnEmployedGraduates != 0) {
    EmploymentRate = Math.round((backendData.males.countOfEmployedGraduates) * 100 / (backendData.males.countOfEmployedGraduates + backendData.males.countOfUnEmployedGraduates))
  }
  const Colors = ['#1E90FF', '#6C757D']
  return (
    <div style={{ width: '170px', height: '210px' }}>
      <PieChart width={170} height={190}>
        <Pie
          data={data}
          cx={75}
          cy={75}
          innerRadius={20}
          outerRadius={40}
          paddingAngle={5}
          datakey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={Colors[index % Colors.length]} />
          ))}
        </Pie>
        <Legend />
        <text x={145} y={100} dy={8} textAnchor="middle" fill={'#749eb2'} fontSize={17}>
          {`${EmploymentRate}%`}
        </text>
      </PieChart>
    </div>
  )
}
export default EmploymentRateMales;