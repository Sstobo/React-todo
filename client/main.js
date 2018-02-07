import { Meteor } from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";

import App from "../imports/ui/containers/App";
import "./main.css";

Meteor.startup(() => ReactDOM.render(<App />, document.getElementById("root")));
// triggers following command on startup, once everything is loaded