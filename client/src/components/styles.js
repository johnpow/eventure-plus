import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: 'grid',
    minWidth: '320px',
    
    gridTemplateColumns: 'repeat(3, 1fr)',
    marginBottom: theme.spacing(),
    paddingLeft: theme.spacing(20),
    paddingRight: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(2, 1fr)', // Switch to two columns on medium screens
        marginBottom: theme.spacing(),
        paddingLeft: theme.spacing(20),
        paddingRight: theme.spacing(5),
      },
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(1, 1fr)', // Switch to single column on small screens
      },
      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: 'repeat(1, 1fr)', // Switch to single column on extra small screens
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
      },
  },
  cardItem: {
   // Adjust the margin value as needed
    
    width: 'unset',
    minWidth: '320px',
    maxWidth: '320px',
    marginRight: '45px',
    [theme.breakpoints.down('sm')]: {
      marginRight: '0',
      marginLeft: '0',
      width: "unset"
    }
  },
  cardContainer2: {
    display: 'grid',
    gridTemplateColumns: '1fr', // One column taking up the whole width
    marginBottom: theme.spacing(3),
    paddingLeft: '200px',
    paddingRight: theme.spacing(5),
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100vw', 
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr', // Switch to two columns on medium screens
    },
  [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr', // Switch to single column on small screens
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr', // Switch to single column on extra small screens
      paddingLeft: '0',
    },
  },

}));

export default useStyles;