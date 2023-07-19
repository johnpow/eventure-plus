import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    marginBottom: theme.spacing(3),
    paddingLeft: theme.spacing(20),
    paddingRight: theme.spacing(10),
    marginLeft: 'auto',
    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(2, 1fr)', // Switch to two columns on medium screens
      },
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(1, 1fr)', // Switch to single column on small screens
      },
      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: 'repeat(1, 1fr)', // Switch to single column on extra small screens
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '0',
      },
  },
  cardItem: {
    margin: theme.spacing(1), // Adjust the margin value as needed
  },
}));

export default useStyles;