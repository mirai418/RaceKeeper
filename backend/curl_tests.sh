#!/bin/bash
curl --data '{"member_id":1234, "race_id":"4321"}' 127.0.0.1:8080/addMemberToRaceGroup/
curl --data '{"start_date": "Aug 12", "end_date": "Aug 14", "activity_type": "Running", "race_name": "Summer Race"}' 127.0.0.1:8080/addRaceGroup/
