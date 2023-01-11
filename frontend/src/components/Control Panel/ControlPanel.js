import * as React from 'react';

import ViewPanel from './Panels/ViewPanel';
import ProblemView from './Panels/ProblemView';
import CommandPanel from './Panels/CommandPanel';
import MaintenancePanel from './Panels/MaintenancePanel';

import AuthService from '../../services/authService'
import { Component } from "react";
import axios from "axios";

import { config } from '../../config'

export default class ControlPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panels: [],
            panelInstruction: [],
            default: [{
                instruction: false,
            }],
            problem: false,
            time: Date.now(),
            date: Date()

        }

        this.switchAllPanels = this.switchAllPanels.bind(this)
        this.switchPanelbyIndex = this.switchPanelbyIndex.bind(this)
        this.actualize = this.actualize.bind(this)
        this.setPanelStatus = this.setPanelStatus.bind(this)
        this.sendUserLogs = this.sendUserLogs.bind(this)
        this.totalShutDown = this.totalShutDown.bind(this)
        this.ShutDownByState = this.ShutDownByState.bind(this)

    }

    async componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);


        let url = 'http://' + config.ip + ':' + config.port + '/instructions'
        setInterval(() => {
            axios.get(url)
                .then((Reponse) => {
                    this.setState({
                        panelInstruction: Reponse.data,
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
        },

            1000);

        url = 'http://' + config.ip + ':' + config.port + '/panels'

        setInterval(() => {
            axios.get(url)
                .then((Reponse) => {
                    this.setState({
                        panels: Reponse.data,
                    })
                })
                .catch((error) => {
                    console.log(error)
                });
        },

            1000);

        url = "http://" + config.ip + ":" + config.port + "/instructions"


        await axios.get(url)
            .then((Reponse) => {
                this.setState({
                    panelInstruction: Reponse.data,
                })
            })
            .catch((error) => {
                console.log(error)
            });

        url = "http://" + config.ip + ":" + config.port + "/panels"

        await axios.get(url)
            .then((Reponse) => {
                this.setState({
                    panels: Reponse.data,
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    async switchPanelbyIndex(sw, str, i, a, b, c) {
        console.log("index : " + sw)
        console.log(i)
        console.log(a)
        console.log(b)
        console.log(c)
        console.log("str :" + str)


        let url = "http://" + config.ip + ":" + config.port + "/instruction/"

        await axios.put(url + this.state.panelInstruction[str - 1]._id, {
            instruction: sw
        })
            .then((Reponse) => {
                console.log(Reponse.data.instruction)
            })
            .catch((error) => {
                console.log(error)
            });

        url = "http://" + config.ip + ":" + config.port + "/instructions/"

        await axios.get(url)
            .then((Reponse) => {
                this.setState({
                    panelInstruction: Reponse.data,
                })
            })
            .catch((error) => {
                console.log(error)
            });

        url = "http://" + config.ip + ":" + config.port + "/panels"

        await axios.get(url)
            .then((Reponse) => {
                this.setState({
                    panels: Reponse.data,
                })
            })
            .catch((error) => {
                console.log(error)
            });
        url = "http://" + config.ip + ":" + config.port + "/instruction/"

        await axios.put(url + this.state.panelInstruction[str - 1]._id, {
            instruction: sw
        })
            .then((Reponse) => {
                console.log(Reponse.data.instruction)
            })
            .catch((error) => {
                console.log(error)
            });

        url = "http://" + config.ip + ":" + config.port + "/instructions/"

        await axios.get(url)
            .then((Reponse) => {
                this.setState({
                    panelInstruction: Reponse.data,
                })
            })
            .catch((error) => {
                console.log(error)
            });

        url = "http://" + config.ip + ":" + config.port + "/panels"

        await axios.get(url)
            .then((Reponse) => {
                this.setState({
                    panels: Reponse.data,
                })
            })
            .catch((error) => {
                console.log(error)
            });
        if (sw) {
            this.sendUserLogs(this.state.panels[str - 1].name, "ok", "Allumage".concat(" ", this.state.panels[str - 1].name))

        } else {
            this.sendUserLogs(this.state.panels[str - 1].name, "ok", "Extinction".concat(" ", this.state.panels[str - 1].name))

        }

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    async totalShutDown(state = false) {
        let url = "http://" + config.ip + ":" + config.port + "/instructions"

        if (state != false) {
            state = !(state[0].state)
        }

        await axios.get(url)
            .then((Reponse) => {
                this.setState({
                    panelInstruction: Reponse.data,
                })
            })
            .catch((error) => {
                console.log(error)
            });

        url = "http://" + config.ip + ":" + config.port + "/panels"

        await axios.get(url)
            .then((Reponse) => {
                this.setState({
                    panels: Reponse.data,
                })
            })
            .catch((error) => {
                console.log(error)
            });

        url = "http://" + config.ip + ":" + config.port + "/instruction/"


        await axios.put(url + this.state.panelInstruction[0]._id, {
            instruction: state
        })
            .then((Reponse) => {
                console.log(Reponse.data.instruction)
            })
            .catch((error) => {
                console.log(error)
            });


        await axios.put(url + this.state.panelInstruction[1]._id, {
            instruction: state
        })
            .then((Reponse) => {
                console.log(Reponse.data.instruction)
            })
            .catch((error) => {
                console.log(error)
            });
        await axios.put(url + this.state.panelInstruction[2]._id, {
            instruction: state
        })
            .then((Reponse) => {
                console.log(Reponse.data.instruction)
            })
            .catch((error) => {
                console.log(error)
            });


        if (state == false) {
            this.sendUserLogs(0, "ok", "Extinction Indret")
            this.sendUserLogs(1, "ok", "Extinction UB Aval")
            this.sendUserLogs(2, "ok", "Extinction UB Amont")
        } else {
            this.sendUserLogs(0, "ok", "Allumage Indret")
            this.sendUserLogs(1, "ok", "Allumage UB Aval")
            this.sendUserLogs(2, "ok", "Allumage UB Amont")
        }
    }
    async ShutDownByState(state = false) {
        let url = "http://" + config.ip + ":" + config.port + "/instructions"


        await axios.get(url)
            .then((Reponse) => {
                this.setState({
                    panelInstruction: Reponse.data,
                })
            })
            .catch((error) => {
                console.log(error)
            });

        url = "http://" + config.ip + ":" + config.port + "/panels"

        await axios.get(url)
            .then((Reponse) => {
                this.setState({
                    panels: Reponse.data,
                })
            })
            .catch((error) => {
                console.log(error)
            });

        url = "http://" + config.ip + ":" + config.port + "/instruction/"


        await axios.put(url + this.state.panelInstruction[0]._id, {
            instruction: state
        })
            .then((Reponse) => {
                console.log(Reponse.data.instruction)
            })
            .catch((error) => {
                console.log(error)
            });


        await axios.put(url + this.state.panelInstruction[1]._id, {
            instruction: state
        })
            .then((Reponse) => {
                console.log(Reponse.data.instruction)
            })
            .catch((error) => {
                console.log(error)
            });
        await axios.put(url + this.state.panelInstruction[2]._id, {
            instruction: state
        })
            .then((Reponse) => {
                console.log(Reponse.data.instruction)
            })
            .catch((error) => {
                console.log(error)
            });

        if (state == false) {
            this.sendUserLogs(0, "ok", "Extinction Indret")
            this.sendUserLogs(1, "ok", "Extinction UB Aval")
            this.sendUserLogs(2, "ok", "Extinction UB Amont")
        } else {
            this.sendUserLogs(0, "ok", "Allumage Indret")
            this.sendUserLogs(1, "ok", "Allumage UB Aval")
            this.sendUserLogs(2, "ok", "Allumage UB Amont")
        }

    }

    async switchAllPanels(a, b, c, d) {

        console.log("a : ", a)
        console.log("b : ", b)
        console.log("c : ", c)
        console.log("d : ", d)



        this.setState({
            panelInstructions: [{
                index: 0,
                name: "Indret",
                instruction: !b[0].state,
            },
            {
                index: 1,
                name: "UB Aval",
                instruction: !b[1].state,
            },
            {
                index: 2,
                name: "UB Amont",
                instruction: !b[2].state,
            }]
        })
    }


    async setPanelStatus(online, id) {
        const url = "http://" + config.ip + ":" + config.port + "/panel/"
        if (online) {
            await axios.put(url + id, {
                online: true
            })
                .then((Reponse) => {
                })
                .catch((error) => {
                    console.log(error)
                });
        } else {
            await axios.put(url + id, {
                online: false
            })
                .then((Reponse) => {
                })
                .catch((error) => {
                    console.log(error)
                });
        }

    }


    async sendUserLogs(name, state, message = "a actionné les panneaux") {
        console.log("SENDING USER LOGS...")
        var date = new Date();
        const url = "http://" + config.ip + ":" + config.port + "/userLogs"
        await axios.post(url, {
            username: AuthService.getCurrentUser().username,
            message: message,
            date: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
        })
            .then((Reponse) => {
            })
            .catch((error) => {
                console.log(error)
            });
    }

    async hasProblem() {
        let url = "http://" + config.ip + ":" + config.port + "/instructions/"

        await axios.get(url)
            .then((Reponse) => {
                this.setState({
                    panelInstruction: Reponse.data,
                })
            })
            .catch((error) => {
                console.log(error)
            });

        this.state.panelInstruction.map((inst) => {
            if (inst.instruction == true) {
                this.totalShutDown();
            }
        })
    }


    actualize(checked) {

        console.log(checked)
    }


    render() {
        let error = false
        this.state.panels.map((panel) => {
            if (panel.bug) {
                error = true
            }
        })
        if (error) {
            this.hasProblem()
            return (
                <div>
                    <ProblemView panels={this.state.panels} />
                </div>
            )
        }
        else {
            if (AuthService.getCurrentUser()['roles'][0] === 'ROLE_USER') {
                return (
                    <div >
                        <ViewPanel panels={this.state.panels} />
                    </div>
                )
            } else if (AuthService.getCurrentUser()['roles'][0] === 'ROLE_ADMIN') {
                return (
                    <div >

                        <CommandPanel actualize={this.actualize} panels={this.state.panels}
                            panelInstruction={this.state.panelInstruction ? this.state.panelInstruction : this.state.default}
                            switchPanels={this.switchAllPanels.bind(this)}
                            totalShutDown={this.totalShutDown.bind(this)}
                            ShutDownByState={this.ShutDownByState.bind(this)}

                        />
                    </div>
                )
            } else if (AuthService.getCurrentUser()['roles'][0] === 'ROLE_SUPERUSER') {
                return (
                    <div >
                        <MaintenancePanel actualize={this.actualize.bind(this)} panels={this.state.panels}
                            panelInstruction={this.state.panelInstruction ? this.state.panelInstruction : this.state.default}
                            switchPanels={this.switchAllPanels.bind(this)}
                            switchPanelbyIndex={this.switchPanelbyIndex.bind(this)}
                            totalShutDown={this.totalShutDown.bind(this)}
                            ShutDownByState={this.ShutDownByState.bind(this)}
                        />

                    </div>


                )
            }
        }


    }

}


