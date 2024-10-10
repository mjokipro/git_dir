from flask import Flask, request, render_template, redirect, flash, session, make_response
from flask_debugtoolbar import DebugToolbarExtension
from surveys import surveys
# key names will use to store some things in the session;
# put here as constants so we're guaranteed to be consistent in
# our spelling of these
RESPONSES_KEY = "responses"
CURRENT_SURVEY_KEY = "current_survey"

app = Flask(__name__)
app.config['SECRET_KEY'] = "never-tell!"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

##### VIEWS START ######

### root get / pick_survey.html ###

@app.route("/")
def show_pick_survey_form():
    """Select a survey, send surveys obj to pick_survey"""

    return render_template("pick_survey.html", surveys=surveys)

###### root post / survey_start (form action="/begin") ######

@app.route("/", methods=["POST"])
def pick_survey():
    """Clear the session of responses."""
    # key
    survey_id = request.form['survey_code']
    
    if request.cookies.get(f"completed_{survey_id}"):
        return render_template("already-done.html")
    
    survey = surveys[survey_id]
    
    session[CURRENT_SURVEY_KEY] = survey_id

    return render_template("survey_start.html", survey=survey)

###### /begin / redirect /questions/0 loop ######

@app.route("/begin", methods=["POST"])
def start_survey():
    """clear responses"""
    session[RESPONSES_KEY] = []

    return redirect("/questions/0")

###### questions /<int:qid> (questions loop) ######

# qid is question element array index number ex 0
@app.route("/questions/<int:qid>")
def show_question(qid):
    """Display current question."""
    responses = session.get(RESPONSES_KEY)
    print("#############")
    print(responses)
    print("#############")

    # ex 'satisfaction', alias for survey
    survey_code = session[CURRENT_SURVEY_KEY]
    
    # ex questions for one survey per survey code from surveys dict
    survey = surveys[survey_code]
    
    print("#############")
    print(survey_code)
    print(survey)
    print("#############")
    
    # trying to access question page too soon
    if (responses is None):
        return redirect("/")

    # They've answered all the questions! Thank them.
    if (len(responses) == len(survey.questions)):
        return redirect("/complete")

    # Trying to access questions out of order.
    if (len(responses) != qid):
        flash(f"Invalid question id: {qid}.")
        return redirect(f"/questions/{len(responses)}")

    # get 1 question for current question id from q array
    question = survey.questions[qid]
    
    # return cookie of question_num = current question index ex 0 for start
    return render_template(
        "question.html", question_num=qid, question=question)

######### answer view #########

@app.route("/answer", methods=["POST"])
def handle_question():
    """Save response and redirect to next question."""

    # get the response choice
    choice = request.form['answer']

    # add this response to the session
    responses = session[RESPONSES_KEY]
    responses.append(choice)
    session[RESPONSES_KEY] = responses
    
    survey_code = session[CURRENT_SURVEY_KEY]
    survey = surveys[survey_code]

    if (len(responses) == len(survey.questions)):
        # They've answered all the questions! Thank them.
        return redirect("/complete")

    else:
        return redirect(f"/questions/{len(responses)}")

@app.route("/complete")
def complete():
    """Survey complete. Show completion page."""
    survey_id = session[CURRENT_SURVEY_KEY]
    survey = surveys[survey_id]
    responses = session[RESPONSES_KEY]
    
    html = render_template("completion.html", survey=survey, responses=responses)
    
    # set cookie noting survey is done so cant redo
    response = make_response(html)
    response.set_cookie(f"completed_{survey_id}", "yes", max_age=60)
    
    return response
