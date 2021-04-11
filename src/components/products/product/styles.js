import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    // maxWidth: 345, original width style
    maxWidth: '100%',
  },
  media: {
    height: 0,
    paddingTop: '90.25%', // 16:9
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    color: 'green',
    backgroundColor: '#F7B839'
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));