import { render, screen, fireEvent} from "@testing-library/react";
import { click } from "@testing-library/user-event/dist/click";
import { BrowserRouter as Router } from 'react-router-dom';
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import NavBar from "../NavBar";

test('renders NavBar', () => {
    render(<Router>
        <NavBar />
    </Router>);
    //screen.debug();

    const signInLink = screen.getByRole('link', { name: 'Sign in' })
    expect(signInLink).toBeInTheDocument();
});

test('renders link to the user profile for a logged in user', async () => {
    render(
        <Router>
            <CurrentUserProvider>
                <NavBar />
            </CurrentUserProvider>
        </Router>
    );

    const profileAvatar = await screen.findByText('Profile');
    expect(profileAvatar).toBeInTheDocument();
});

test('renders Sign in and Sign up buttons after user log out', async () => {
    render(
        <Router>
            <CurrentUserProvider>
                <NavBar />
            </CurrentUserProvider>
        </Router>
    );
    const signOutLink = await screen.findByRole('link', {name: 'Sign out'})
    fireEvent.click(signOutLink)
    
    const signInLink = await screen.findByRole('link', { name: 'Sign in' })
    expect(signInLink).toBeInTheDocument();
    const signUpLink = await screen.findByRole('link', { name: 'Sign up' })
    expect(signUpLink).toBeInTheDocument();

})