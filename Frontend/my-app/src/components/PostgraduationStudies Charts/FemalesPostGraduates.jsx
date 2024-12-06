import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Label, ResponsiveContainer } from 'recharts';

function FemalePostgraduates(props) {
  const postGraduateData = {
    "maleCount": 100,
    "femaleCount": 200,
    "malesMastersHolders": 50,
    "femalesMastersHolders": 35,
    "malesPhdHolders": 20,
    "femalesPhdHolders": 23
  }
    ;
  const data = [
    {
      "degree": "Masters",
      "Number Of Females' Postgraduate Studies": postGraduateData.femalesMastersHolders,
      "count": postGraduateData.femalesMastersHolders
    },
    {
      "degree": "PhD",
      "Number Of Females' Postgraduate Studies": postGraduateData.femalesPhdHolders,
      "count": postGraduateData.femalesPhdHolders
    }
  ]
  return (
    <>
      <BarChart width={360} height={315} data={data} margin={{ top: 20, right: 100, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="degree" />
        <YAxis />
        <Tooltip />
        <Legend content={'Number Of Female Alumni'} />
        <Bar dataKey="Number Of Females' Postgraduate Studies" fill="#bd8e83" />
      </BarChart>
    </>
  )
}
export default FemalePostgraduates;