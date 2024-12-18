import React, { Component } from "react";
import ProblemBox from "./ProblemBox";
import "./TableRow.css";

import defaultImage from "../../assets/default.png";
import beginner from "../../assets/beginner.png";
import intermediate from "../../assets/intermediate.png";
import advanced from "../../assets/advanced.png";

const images = {
  "Principiante": beginner,
  "Intermedio": intermediate,
  "Avanzado": advanced
};

class TableRow extends Component {
  shouldComponentUpdate(nextProps) {
    // Compare the current properties with the new properties
    if (
      this.props.team !== nextProps.team ||
      this.props.classNameForThisRow !== nextProps.classNameForThisRow ||
      this.props.numberOfProblems !== nextProps.numberOfProblems ||
      this.props.problems !== nextProps.problems ||
      this.props.submissionWhenFrozen !== nextProps.submissionWhenFrozen ||
      this.props.currentFrozenSubmission !== nextProps.currentFrozenSubmission ||
      this.props.savedCurrentFrozenSubmission !== nextProps.savedCurrentFrozenSubmission
    ) {
      return true;
    }
    return false;
  }

  getImageForTeam(url) {
    return images[url] ?? defaultImage;
  }

  numberOfTriesOnAcceptedProblem(problemLetter) {
    let team = this.props.team;
    for (let i = 0; i < this.props.numberOfProblems; i++) {
      if (this.props.problems[i].index === problemLetter) {
        return team.triesOnProblems[i] + 1 + " - " + team.penaltyOnProblem[i];
      }
    }
    return problemLetter;
  }

  numberOfTriesOnTriedProblem(problemLetter) {
    let team = this.props.team;
    for (let i = 0; i < this.props.numberOfProblems; i++) {
      if (this.props.problems[i].index === problemLetter) {
        return team.triesOnProblems[i] + " - " + team.penaltyOnProblem[i];
      }
    }
    return problemLetter;
  }

  numberOfTriesOnFrozenProblem(problemLetter) {
    let team = this.props.team;
    let submissionWhenFrozen = this.props.submissionWhenFrozen;
    if (
      submissionWhenFrozen === undefined ||
      submissionWhenFrozen === null ||
      submissionWhenFrozen.length === 0
    ) {
      return problemLetter;
    }
    for (let i = 0; i < this.props.numberOfProblems; i++) {
      if (this.props.problems[i].index === problemLetter) {
        if (team.isProblemSolved[i] !== 0) {
          return problemLetter;
        }
        for (let j = 0; j < submissionWhenFrozen.length; j++) {
          if (
            submissionWhenFrozen[j].contestantName === team.name &&
            submissionWhenFrozen[j].problemIndex === problemLetter
          ) {
            return team.triesOnProblems[i] + 1 + " - " + submissionWhenFrozen[j].timeSubmitted;
          }
        }
      }
    }
    return problemLetter;
  }

  hasSolvedProblem(problemLetter) {
    let team = this.props.team;
    for (let i = 0; i < this.props.numberOfProblems; i++) {
      if (this.props.problems[i].index === problemLetter) {
        if (team.isProblemSolved[i] === 0) {
          return false;
        } else {
          return true;
        }
      }
    }
    return false;
  }

  hasTriedProblem(problemLetter) {
    let team = this.props.team;
    for (let i = 0; i < this.props.numberOfProblems; i++) {
      if (this.props.problems[i].index === problemLetter) {
        if (team.triesOnProblems[i] !== 0) {
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  }

  isFirstToSolve(problemLetter) {
    let team = this.props.team;
    for (let i = 0; i < this.props.numberOfProblems; i++) {
      if (this.props.problems[i].index === problemLetter) {
        if (team.isFirstToSolve[i] !== 0) {
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  }

  isAPendingProblem(problemLetter) {
    let team = this.props.team;
    let submissionWhenFrozen = this.props.submissionWhenFrozen;
    if (submissionWhenFrozen === undefined || submissionWhenFrozen.length === 0) {
      return false;
    }
    for (let i = 0; i < this.props.numberOfProblems; i++) {
      if (this.props.problems[i].index === problemLetter) {
        if (team.isProblemSolved[i] !== 0) {
          return false;
        }
        for (let j = 0; j < submissionWhenFrozen.length; j++) {
          if (
            submissionWhenFrozen[j].contestantName === team.name &&
            submissionWhenFrozen[j].problemIndex === problemLetter
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  isAPendingProblemOnThisRow(problemLetter) {
    let team = this.props.team;
    let savedCurrentFrozenSubmission = this.props.savedCurrentFrozenSubmission;
    if (
      savedCurrentFrozenSubmission === undefined ||
      savedCurrentFrozenSubmission === null ||
      savedCurrentFrozenSubmission.length === 0
    ) {
      return false;
    }
    for (let i = 0; i < this.props.numberOfProblems; i++) {
      if (this.props.problems[i].index === problemLetter) {
        if (team.isProblemSolved[i] !== 0) {
          return false;
        }
        if (
          savedCurrentFrozenSubmission.contestantName === team.name &&
          savedCurrentFrozenSubmission.problemIndex === problemLetter
        ) {
          return true;
        }
      }
    }
    return false;
  }

  isACurrentFrozenProblem(problemLetter) {
    if (this.props.currentFrozenSubmission === null) {
      return false;
    }
    if (
      this.props.currentFrozenSubmission.contestantName === this.props.team.name &&
      problemLetter === this.props.currentFrozenSubmission.problemIndex
    ) {
      return true;
    }
    return false;
  }

  thisRowShhouldBeSelected(problems) {
    return (
      this.props.classNameForThisRow !== null &&
      this.props.classNameForThisRow !== undefined &&
      this.props.classNameForThisRow.length !== 0
    );
  }

  render() {
    let problems = this.props.problems;

    let sizeProblem = 84.0 / this.props.numberOfProblems;
    let widthPercentage = sizeProblem + "%";

    let problemColumns = problems.map(problem => {
      let verdict = "NoAttempted";
      let textToShowInProblem = problem.index;

      if (this.hasSolvedProblem(problem.index) === true) {
        if (this.isFirstToSolve(problem.index) === true) {
          verdict = "FirstAccepted";
        } else {
          verdict = "Accepted";
        }
        textToShowInProblem = this.numberOfTriesOnAcceptedProblem(problem.index);
      } else if (this.isACurrentFrozenProblem(problem.index) === true) {
        verdict = "Resolving";
        textToShowInProblem = this.numberOfTriesOnFrozenProblem(problem.index);
      } else if (this.isAPendingProblem(problem.index) === true) {
        verdict = "Pending";
        textToShowInProblem = this.numberOfTriesOnFrozenProblem(problem.index);
      } else if (this.hasTriedProblem(problem.index) === true) {
        verdict = "WrongAnswer";
        textToShowInProblem = this.numberOfTriesOnTriedProblem(problem.index);
      }

      return {
        key: problem.index,
        index: problem.index,
        width: widthPercentage,
        problemStatus: verdict,
        displayText: textToShowInProblem,
      };
    });

    let classNameForEachRow = "scoreboardTableGrayRow";
    if (this.thisRowShhouldBeSelected(problems) === true) {
      classNameForEachRow += this.props.classNameForThisRow;
    } else if (this.props.index % 2 !== 0) {
      classNameForEachRow = "scoreboardTableBlackRow";
    }

    return (
      <div className={"tableRow " + classNameForEachRow} id={this.props.team.id}>
        {/*Rank*/}
        <span className="tableRow-Rank">{this.props.team.position}</span>
        {/*Photo*/}
        <img
          className="tableRow-Picture"
          src={this.getImageForTeam(this.props.team.iconName)}
          alt=""
        />
        {/*Name+Problems*/}
        <div className="tableRow-TeamData">
          {/*ContestantName*/}
          <span className="tableRox-ContestantName">{this.props.team.name}</span>
          {/*Problem Boxes*/}
          <div className="tableRox-Problems">
            {problemColumns.map(problemData => {
              return <ProblemBox {...problemData} />;
            })}
          </div>
        </div>
        {/*ProblemsSolved*/}
        <span className="tableRow-ResolvedProblems">{this.props.team.solved}</span>
        {/*Penalty*/}
        <span className="tableRow-Penalty">{this.props.team.penalty}</span>
      </div>
    );
  }
}

export default TableRow;
