import { Cell, Legend, PieChart, Pie } from "recharts";

function EmploymentRate(props) {
  const backendData = props.response;
  let EmploymentRate = 0;
  const data = [
    {
      name: 'Employed',
      value: backendData.males.countOfEmployedGraduates + backendData.females.countOfEmployedGraduates,
    },
    {
      name: 'Unknown',
      value: backendData.males.countOfUnEmployedGraduates + backendData.females.countOfUnEmployedGraduates,
    }
  ];
  if (backendData.males.countOfEmployedGraduates + backendData.females.countOfEmployedGraduates + backendData.males.countOfUnEmployedGraduates + backendData.females.countOfUnEmployedGraduates != 0) {
    EmploymentRate = Math.ceil(
      (backendData.males.countOfEmployedGraduates + backendData.females.countOfEmployedGraduates) * 100 /
      (backendData.males.countOfEmployedGraduates + backendData.females.countOfEmployedGraduates + backendData.males.countOfUnEmployedGraduates + backendData.females.countOfUnEmployedGraduates))
  }
  const Colors = ['#008080', '#6C757D'];

  return (
    <div style={{ width: '230px', height: '200px' }}>
      <PieChart width={210} height={190}>
        <Pie
          data={data}
          cx={100}
          cy={75}
          innerRadius={25}
          outerRadius={50}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={Colors[index % Colors.length]} />
          ))}
        </Pie>
        <Legend />
        <text x={185} y={100} dy={8} textAnchor="middle" fill={'#008080'} fontSize={24}>
          {`${EmploymentRate}%`}
        </text>
      </PieChart>
    </div>
  );
}

export default EmploymentRate;
