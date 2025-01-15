// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { Grid } from '@mui/material'

const radialBarColors = {
    series1: '#fdd835',
    series2: '#40CDFA',
    series3: '#00d4bd',
    series4: '#7367f0',
    series5: '#FFA1A1'
}

const CrmPieChart = () => {
    // ** Hook
    const theme = useTheme()

    const optionsOne = {
        stroke: { lineCap: 'round' },
        labels: ['Lead-to-Opportunity Ratio'],
        legend: {
            show: true,
            position: 'bottom',
            labels: {
                colors: theme.palette.text.secondary
            },
            markers: {
                offsetX: -3
            },
            itemMargin: {
                vertical: 3,
                horizontal: 10
            }
        },
        colors: [radialBarColors.series1],
        plotOptions: {
            radialBar: {
                hollow: { size: '50%' },
                track: {
                    margin: 15,
                    background: hexToRGBA(theme.palette.customColors.trackBg, 1)
                },
                dataLabels: {
                    name: {
                        fontSize: '2rem',
                        show: false
                    },
                    value: {
                        fontSize: '1.6rem',
                        color: theme.palette.text.secondary
                    },
                    total: {
                        show: true,
                        fontWeight: 400,
                        // label: '',
                        fontSize: '1.125rem',
                        color: theme.palette.text.primary,
                        formatter: function (w) {
                            const totalValue =
                                w.globals.seriesTotals.reduce((a, b) => {
                                    return a + b
                                }, 0) / w.globals.series.length
                            if (totalValue % 1 === 0) {
                                return totalValue + '%'
                            } else {
                                return totalValue.toFixed(2) + '%'
                            }
                        }
                    }
                }
            }
        },
        grid: {
            padding: {
                top: -35,
                bottom: -30
            }
        }
    }

    const optionsTwo = {
        stroke: { lineCap: 'round' },
        labels: ['Opportunity-to-Wins Ratio'],
        legend: {
            show: true,
            position: 'bottom',
            labels: {
                colors: theme.palette.text.secondary
            },
            markers: {
                offsetX: -3
            },
            itemMargin: {
                vertical: 3,
                horizontal: 10
            }
        },
        colors: [radialBarColors.series4],
        plotOptions: {
            radialBar: {
                hollow: { size: '50%' },
                track: {
                    margin: 15,
                    background: hexToRGBA(theme.palette.customColors.trackBg, 1)
                },
                dataLabels: {
                    name: {
                        fontSize: '2rem',
                        show: false
                    },
                    value: {
                        fontSize: '1.6rem',
                        color: theme.palette.text.secondary
                    },
                    total: {
                        show: true,
                        fontWeight: 400,
                        // label: 'optionsTwo',
                        fontSize: '1.125rem',
                        color: theme.palette.text.primary,
                        formatter: function (w) {
                            const totalValue =
                                w.globals.seriesTotals.reduce((a, b) => {
                                    return a + b
                                }, 0) / w.globals.series.length
                            if (totalValue % 1 === 0) {
                                return totalValue + '%'
                            } else {
                                return totalValue.toFixed(2) + '%'
                            }
                        }
                    }
                }
            }
        },
        grid: {
            padding: {
                top: -35,
                bottom: -30
            }
        }
    }
    const optionThree = {
        stroke: { lineCap: 'round' },
        labels: ['Lead Conversion Ratio'],
        legend: {
            show: true,
            position: 'bottom',
            labels: {
                colors: theme.palette.text.secondary
            },
            markers: {
                offsetX: -3
            },
            itemMargin: {
                vertical: 3,
                horizontal: 10
            }
        },
        colors: [radialBarColors.series2],
        plotOptions: {
            radialBar: {
                hollow: { size: '50%' },
                track: {
                    margin: 15,
                    background: hexToRGBA(theme.palette.customColors.trackBg, 1)
                },
                dataLabels: {
                    name: {
                        fontSize: '2rem',
                        show: false
                    },
                    value: {
                        fontSize: '1.6rem',
                        color: theme.palette.text.secondary
                    },
                    total: {
                        show: true,
                        fontWeight: 400,
                        // label: 'optionsTwo',
                        fontSize: '1.125rem',
                        color: theme.palette.text.primary,
                        formatter: function (w) {
                            const totalValue =
                                w.globals.seriesTotals.reduce((a, b) => {
                                    return a + b
                                }, 0) / w.globals.series.length
                            if (totalValue % 1 === 0) {
                                return totalValue + '%'
                            } else {
                                return totalValue.toFixed(2) + '%'
                            }
                        }
                    }
                }
            }
        },
        grid: {
            padding: {
                top: -35,
                bottom: -30
            }
        }
    }

    const optionFour = {
        stroke: { lineCap: 'round' },
        labels: ['Overall Target Progress'],
        legend: {
            show: true,
            position: 'bottom',
            labels: {
                colors: theme.palette.text.secondary
            },
            markers: {
                offsetX: -3
            },
            itemMargin: {
                vertical: 3,
                horizontal: 10
            }
        },
        colors: [radialBarColors.series5],
        plotOptions: {
            radialBar: {
                hollow: { size: '50%' },
                track: {
                    margin: 15,
                    background: hexToRGBA(theme.palette.customColors.trackBg, 1)
                },
                dataLabels: {
                    name: {
                        fontSize: '2rem',
                        show: false
                    },
                    value: {
                        fontSize: '1.6rem',
                        color: theme.palette.text.secondary
                    },
                    total: {
                        show: true,
                        fontWeight: 400,
                        // label: 'optionsTwo',
                        fontSize: '1.125rem',
                        color: theme.palette.text.primary,
                        formatter: function (w) {
                            const totalValue =
                                w.globals.seriesTotals.reduce((a, b) => {
                                    return a + b
                                }, 0) / w.globals.series.length
                            if (totalValue % 1 === 0) {
                                return totalValue + '%'
                            } else {
                                return totalValue.toFixed(2) + '%'
                            }
                        }
                    }
                }
            }
        },
        grid: {
            padding: {
                top: -35,
                bottom: -30
            }
        }
    }
    return (
        <Card>
            <CardHeader title='Statistics' />
            <CardContent>
                <Grid container spacing={6}>
                    <Grid item xs={12} sm={12} md={6}>
                        <ReactApexcharts type='radialBar' height={300} options={optionsOne} series={[85]} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <ReactApexcharts type='radialBar' height={300} options={optionsTwo} series={[61]} />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                        <ReactApexcharts type='radialBar' height={300} options={optionThree} series={[34]} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <ReactApexcharts type='radialBar' height={300} options={optionFour} series={[51]} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default CrmPieChart
