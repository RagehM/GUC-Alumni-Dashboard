import { Cell, Legend, PieChart, Pie } from "recharts";

function EmploymentRateFemales(props) {
  const backendData = props.response;
  let EmploymentRate = 0;
  const data = [
    { name: 'Employed Females', value: backendData.females.countOfEmployedGraduates },
    { name: 'Unknown', value: backendData.females.countOfUnEmployedGraduates }
  ]
  if (backendData.females.countOfEmployedGraduates + backendData.females.countOfUnEmployedGraduates != 0) {
    EmploymentRate = Math.round((backendData.females.countOfEmployedGraduates) * 100 / (backendData.females.countOfEmployedGraduates + backendData.females.countOfUnEmployedGraduates))
  }
  const Colors = ['#FF6F61', '#6C757D']
  return (
    <div style={{ width: '180px', height: '210px' }}>
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
        <text x={150} y={100} dy={8} textAnchor="middle" fill={'#bd8e83'} fontSize={17}>
          {`${EmploymentRate}%`}
        </text>
      </PieChart>
    </div>
  )
}
export default EmploymentRateFemales;