import { useParams } from 'react-router-dom';
// User profile component
const BlogUser = () => {
    const { userId } = useParams<{ userId: string }>();
    return (
        <div>
            <h1>User Profile</h1>
            <p>Viewing profile for user ID: {userId}</p>
        </div>
    );
};
export default BlogUser;