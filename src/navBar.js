import {Container, Navbar, Nav} from "react-bootstrap"

const NavBar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="home">Home</Nav.Link>
            <Nav.Link href="task-list">Task List</Nav.Link>
            <Nav.Link href="create-task">Create Task</Nav.Link>
           
          </Nav>
        </Container>
      </Navbar>
  );
};

export default NavBar;
