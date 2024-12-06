import { Card, CardContent, Typography } from "@mui/material";

function TotalCountOfAlumni(prop) {
	const { titleText, bgColor, graduatesCount } = prop;
	let value = titleText == 'Whole Batch' ? graduatesCount.maleCount + graduatesCount.femaleCount : titleText == 'Males' ? graduatesCount.maleCount : graduatesCount.femaleCount;
	return (
		<Card sx={{
			backgroundColor: bgColor
		}} variant='outlined'>
			<CardContent>
				<Typography style={{ color: 'white' }}>{value}</Typography>
				<Typography>{titleText}</Typography>
			</CardContent>
		</Card>
	)
}
export default TotalCountOfAlumni;