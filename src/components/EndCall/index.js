import { useEffect, useState } from 'react';
import { fetchRecordings } from '../../api/fetchRecording';
import { useParams } from 'react-router';
import GetAppIcon from '@material-ui/icons/GetApp';
import { IconButton, Icon } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import styles from './styles';

export default function EndCall() {
  const { push } = useHistory();
  const [recordings, setRecordings] = useState(null);
  const classes = styles();
  const { sessionId } = useParams();
  const [areThereRecordings, setareThereRecordings] = useState(false);

  const redirectNewMeeting = () => {
    push('');
  };
  useEffect(() => {
    try {
      fetchRecordings(sessionId).then(data => {
        if (data.data) {
          setRecordings(data.data);
        }
        if (data.data.length) setareThereRecordings(true);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.meetingInfo}>
        <h2>This is an amazing meeting</h2>
        <h2>I hope you have had fun with us</h2>

        <p>Here is a perfect spot for adding colourful details</p>
        <p>Memorable insights and bla,bla,bla</p>
        <IconButton
          onClick={redirectNewMeeting}
          className={classes.new__meeting}
        >
          Start new meeting
        </IconButton>
      </div>
      <div className={classes.banner}>
        <Card className={classes.centeredFlex} variant="outlined">
          <CardContent>
            {areThereRecordings ? (
              <h3>Recordings</h3>
            ) : (
              <h3>There are no recordings</h3>
            )}
          </CardContent>
          <CardActions>
            <div className={classes.root}>
              {recordings
                ? recordings.map(recording => (
                    <div className={classes.recording}>
                      <ul>
                        <li key={recording.id}>
                          Started at: {Date(recording.createdAt)}
                          {recording.status === 'available' ? (
                            <Button
                              color="inherit"
                              edge="start"
                              target="_blank"
                              href={recording.url}
                            >
                              <GetAppIcon />
                            </Button>
                          ) : null}
                        </li>
                      </ul>
                    </div>
                  ))
                : null}
            </div>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
