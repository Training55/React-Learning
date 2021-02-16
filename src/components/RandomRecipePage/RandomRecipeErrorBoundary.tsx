import React, {ErrorInfo} from "react";
import {Component} from "react";


export class RandomRecipeErrorBoundary extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return {hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can also log the error to an error reporting service
        console.log("Hier ist ein Fehler aufgetreten!");
        console.error(error);
        console.error(errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return(
                    <div style={{height: "100vh"}} className="row border justify-content-center align-items-center">
                        <div className="col-2">
                            <div className="alert alert-danger" role="alert">
                                <p style={{textAlign: "center"}}>The recipe of the day provider sent not compliant information!</p>
                            </div>
                        </div>
                    </div>
            );


        }

        return this.props.children;
    }
}