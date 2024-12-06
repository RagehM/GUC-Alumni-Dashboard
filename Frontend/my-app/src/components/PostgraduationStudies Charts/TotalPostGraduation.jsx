import { Card, Typography } from "@mui/material";
import { CardContent } from "@mui/material";

function TotalPostGraduation() {
  const postGraduateData = {
    "maleCount": 100,
    "femaleCount": 200,
    "malesMastersHolders": 50,
    "femalesMastersHolders": 35,
    "malesPhdHolders": 20,
    "femalesPhdHolders": 23
  }
  const total = postGraduateData.malesMastersHolders + postGraduateData.femalesMastersHolders;
  return (
    <div>
      <Card sx={{
        backgroundColor: '#f9f6f0',
        boxShadow: 4,
        borderRadius: 5,
        borderWidth: 1,
        width: 280,
        height: 130,
        paddingTop: 4
      }}
        variant='outlined'>
        <CardContent>
          <Typography sx={{ fontFamily: 'Helvetica', fontSize: 16, textAlign: 'center' }}>Total Count of Alumni pursued Postgraduate Studies</Typography>
          <Typography sx={{ fontFamily: 'Helvetica', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>{total}</Typography>
        </CardContent>
      </Card>
    </div>
  )
}
export default TotalPostGraduation
