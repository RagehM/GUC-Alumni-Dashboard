import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Label, ResponsiveContainer } from 'recharts';

function MalesPostGradates(props) {
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
      "degree": "Masters",
      "Number Of Males' Postgraduate Studies": postGraduateData.malesMastersHolders,
      "count": postGraduateData.malesMastersHolders
    },
    {
      "degree": "PhD",
      "Number Of Males' Postgraduate Studies": postGraduateData.malesPhdHolders,
      "count": postGraduateData.malesPhdHolders
    }
  ]

  return (
    <>

      <BarChart width={370} height={315} data={data} margin={{ top: 20, right: 100, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="degree" />
        <YAxis />
        <Tooltip />
        <Legend content={'Number Of Male Alumni'} />
        <Bar dataKey="Number Of Males' Postgraduate Studies" fill="#749eb2" />
      </BarChart>
    </>
  )
}
export default MalesPostGradates;