import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <>
	<div class="topnav">
        <a class="active" href="http://localhost:3000">Home</a>
        <a href="http://localhost:3001">Comment</a>
        <a href="http://localhost:3002">Messaging</a>
        <a href="http://localhost:3003">About</a>
    </div>

    <div id="partners">

      <br></br>
      <h1>Welcome to the Anonymous Messaging Web Application!</h1>
      <br></br>
      <p>This app was made for CEN3031 taught by Dr. Thomas in order to address the social issue of workplace mistreatment.</p>
      <p>Read more below for the basic details of the project:</p>
      <br></br>
      <br></br>

      <h1>Project Proposal</h1>
    <h3>Team Name: Soft Engineers (Team 30)</h3>
    <h3 id="team-roles-">Team Roles:</h3>
    <ul>
      <li>Product Manager: Adam Hassan</li>
      <li>Scrum Master: Harrison Stark</li>
      <li>Development Team Member: Carl Noll</li>
      <li>Development Team Member: Gregory Bouraoui</li>
    </ul>
    <h3 id="programming-language">Programming Language</h3>
    
    <ul>
      <li>Primarily Python</li>
      <li>Flask Backend</li>
    </ul>
   
    <ul>
      <li>React Frontend</li>
      <li>MongoDB for Database</li>
    </ul>
    <h3 id="challenge">Challenge</h3>
    <ul>
      <li>Social Issue is that of mistreatment in the workplace including pay discrimination and wage gaps.</li>
      <li>Proposed solution is an anonymous messaging platform that allows people to list grievances with companies, report mistreatment, rate company training &amp; inclusivity, and report salaries for the purpose of collective bargaining.</li>
    </ul>
    <h3 id="project-vision">Project Vision</h3>
    <p>What: We want to develop a product with an anonymous messaging platform that allows users to talk to other people in their company and/or organization to discuss workplace mistreatment without fear of retribution. Also will have a feature to optionally report salary along with a select set of demographics and job type / role in order to allow users to check for wage gaps and potentially argue for a more fair wage.</p>
    <p>Who: Employees of any company or organization.</p>
    <p>Why: When customers can discuss mistreatment or low pay with each other, they will have more information to use to argue for better treatment or better pay.</p>

  </div>
    </>

  );
}

export default App;
