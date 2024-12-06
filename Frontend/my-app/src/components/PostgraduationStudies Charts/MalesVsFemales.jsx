import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

function MaleFemalePostStudies(props) {

  const postGraduateData = {
    "maleCount": 100,
    "femaleCount": 200,
    "malesMastersHolders": 50,
    "femalesMastersHolders": 35,
    "malesPhdHolders": 20,
    "femalesPhdHolders": 23
  }


  const data = [
    {
      "gender": "Males",
      "Postgraduates Studies Count": postGraduateData.malesMastersHolders + postGraduateData.malesPhdHolders

    },
    {
      "gender": "Females",
      "Postgraduates Studies Count": postGraduateData.femalesMastersHolders + postGraduateData.femalesPhdHolders
    }
  ]

  return (
    <div>
      <BarChart width={340} height={300} data={data}>
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="gender" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Postgraduates Studies Count" fill="#ac8e60" />
      </BarChart>
    </div>
  )
}
export default MaleFemalePostStudies