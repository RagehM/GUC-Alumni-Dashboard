import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MaleFemalePostStudies from '../PostgraduationStudies Charts/MalesVsFemales';
import TotalPostGraduation from '../PostgraduationStudies Charts/totalPostGraduation';
import { Grid, Typography } from '@mui/material';
import MalesPostGradates from '../PostgraduationStudies Charts/MalesPostGraduates';
import FemalePostgraduates from '../PostgraduationStudies Charts/FemalesPostGraduates';
// import EmploymentRateFemales from '../Overview/EmploymentRateFemales';
// import EmploymentRateMales from '../Overview/EmploymentRateMales';
// import EmploymentRate from '../Overview/EmploymentRate';
// import AvgYearsExperience from '../Overview/AvgYearsExperience';
// import TotalCountOfAlumni from '../Overview/TotalCountOfAlumni';
import WorkModel from '../Workingconditions/WorkModel';
import Heatmap from '../Workingconditions/Heatmap';
import MalesVsFemales from '../Academia/MalesVsFemales';



function CardT(props) {
	const { width, height, cardname, postGraduateData, Overview } = props


	return (
		<Card id={cardname}
			sx={{
				backgroundColor: '#ffffff',
				boxShadow: 4,
				borderRadius: 1.5,
				borderColor: '#D18700',
				borderWidth: 1.5,
				width: width,
				height: height,
				paddingTop: 3
			}}
			variant='outlined'>

			<CardContent>   {/* Ternary operator --> idea from chatgpt */}
				{cardname == "Postgraduate Studies" ? (
					<>
						<Grid container rowSpacing={5} columnSpacing={1.6}>
							<Grid item xs={12}>
								<Typography sx={{ fontFamily: 'Helvetica', fontSize: 17, fontWeight: 'bold' }}>Postgraduate Studies</Typography>
							</Grid>
							<Grid item xs='auto' >
								<TotalPostGraduation />
							</Grid>
							<Grid item xs='auto'>
								<MaleFemalePostStudies />
							</Grid>
							<Grid item xs='auto'>
								<MalesFemalesPostgraduates />
							</Grid>

						</Grid>
					</>
				) : Overview != null ? (
					<>
						<h3>Overview</h3>
						<div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
							{/* <div style={{display:'flex', width:800, height:400, flexDirection:'row' ,gap:25}}>*/}
							{/*Grid for UnEmployment Rates*/}

							<div style={{ justifyContent: 'center', paddingLeft: 200 }}>
								<Grid container spacing={1.5} width={800} paddingTop={3} paddingBottom={3}>
									<Grid item xs={12} >
										<Typography sx={{ fontWeight: 'bold', paddingLeft: 37 }} variant='h9' >Alumni Count</Typography>
									</Grid>

									<Grid item xs='auto' >
										<TotalCountOfAlumni width={230} height={90} titleText={'Whole Batch'} bgColor={'#e9dac4'} />
									</Grid>

									<Grid item xs='auto' >
										<TotalCountOfAlumni width={230} height={90} titleText={'Males'} bgColor={'#a9cee8'} />
									</Grid>

									<Grid item xs='auto' >
										<TotalCountOfAlumni width={230} height={90} titleText={'Females'} bgColor={'#deb3ad'} />
									</Grid>
								</Grid>
							</div>
							<Grid container spacing={1.5} width={800} paddingTop={3} paddingBottom={3}>
								<Grid item xs={12} >
									<Typography sx={{ fontWeight: 'bold' }} variant='h9' >Employment Rates</Typography>
								</Grid>
								<Grid item xs='auto' >
									<EmploymentRate />
								</Grid>
								<Grid item xs='auto' >
									<EmploymentRateMales />
								</Grid>
								<Grid item xs='auto'>
									<EmploymentRateFemales />
								</Grid>
							</Grid>
							<div style={{ justifyContent: 'center', paddingLeft: 200 }}>
								<Grid container spacing={1.5} width={1000} paddingTop={3} paddingBottom={3}>
									<Grid item xs={12} >
										<Typography sx={{ fontWeight: 'bold', paddingLeft: 40 }} variant='h9' > Alumni Experience</Typography>
									</Grid>

									<Grid item xs='auto' >
										<AvgYearsExperience width={260} height={110} titleText={'Whole Batch'} bgColor={'#e9dac4'} />
									</Grid>

									<Grid item xs='auto' >
										<AvgYearsExperience width={260} height={110} titleText={'Males'} bgColor={'#a9cee8'} />
									</Grid>

									<Grid item xs='auto' >
										<AvgYearsExperience width={260} height={110} titleText={'Females'} bgColor={'#deb3ad'} />
									</Grid>
								</Grid>
							</div>
							<div>
							</div>
						</div>
					</>
				) : cardname == "Academics" ? (
					<>
						<Grid>
							<Grid item xs={12}>
								<Typography sx={{ fontFamily: 'Helvetica', fontSize: 17, fontWeight: 'bold' }}>Academic Career</Typography>
							</Grid>
						</Grid>
					</>
				) : cardname == "Companies" ? (
					<h3>Companies and Working Fields</h3>
				) : cardname == "Working Conditions" ? (
					<div style={{ display: 'flex', gap: 20, flexDirection: 'column' }}>
						<h3>Working Conditions</h3>
						<Grid container spacing={1.5} width={800} >
							<Grid item xs={12} >
								<Typography sx={{ fontWeight: 'bold', paddingLeft: 2 }} variant='h9' >Work Mode</Typography>
							</Grid>
							<Grid item xs='auto' >
								<WorkModel />
							</Grid>
							<Heatmap />
						</Grid>
					</div>
				) :
					(<>
						<h1>Hello</h1>
					</>)
				}
			</CardContent>
		</Card>
	)
}
export default CardT;