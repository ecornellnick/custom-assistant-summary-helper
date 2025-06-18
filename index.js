// Wrapping the whole extension in a JS function and calling it immediately 
// (ensures all global variables set in this extension cannot be referenced outside its scope)
(async function(codioIDE, window) {
  
  // Refer to Anthropic's guide on system prompts: https://docs.anthropic.com/claude/docs/system-prompts

// You will be provided with the assignment instructions in the <assignment> tag, 
// all the student code files in the <code> tag and a programming error message in the <error_message> tag.
const systemPrompt = `You are an assistant helping students understand their programming assignments.
Given a programming assignment, your job is to provide a 1-2 sentence summary of the task described in the assignment, and a short list of its requirements.
Note that you will respond without xml tags and only the task summary, starting with Summary: , and the list of requirements starting with Requirements:
If no assignment is given, respond with Nothing to summarize. 
Do not provide code or the full solution. 
Do not ask if there are any more questions.`

  codioIDE.coachBot.register("eCornellErrorAugmentButton", "Give me a summary:", onButtonPress)

  async function onButtonPress() {
    // Function that automatically collects all available context 
    // returns the following object: {guidesPage, assignmentData, files, error}
    let context = await codioIDE.coachBot.getContext()
    
    // try {
    //   input = await codioIDE.coachBot.input("Please paste the error message you want me to explain!")
    // } catch (e) {
      if (e.message == "Cancelled") {
        //codioIDE.coachBot.write("Please feel free to have any other error messages explained!")
        codioIDE.coachBot.showMenu()
        return
      }
    //}
    
    // console.log(input)

    //Define your assistant's userPrompt - this is where you will provide all the context you collected along with the task you want the LLM to generate text for.
    const userPrompt = `
Here is the description of the programming assignment the student is working on:

<assignment>
${context.guidesPage.content}
</assignment>

Note: Here is a list of items that are not part of the assignment instructions:
1. Anything in html <style> tags.
2. Anything in html <script> tags.
3. Anything that resembles autograder feedback about passing or failing tests, i.e. check passed, total passed, total failed, etc.

If any of the above are present in the <assignment>, ignore them as if they're not provided to you

Phrase your explanation directly addressing the student as 'you'.`

    const result = await codioIDE.coachBot.ask({
      systemPrompt: systemPrompt,
      messages: [{"role": "user", "content": userPrompt}]
    })
  }

})(window.codioIDE, window)
