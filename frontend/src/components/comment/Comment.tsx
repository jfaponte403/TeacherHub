
interface Student {
    id: string;
    nickname: string;
    email: string;
}

interface Comment {
    id: string;
    student: Student;
    comment: string;
    isPositive: boolean;
    note: number;
}



const CardComment = ({ comment }: { comment: Comment } ) => {
    return (
        <div className="card p-3 mb-3">
            <p className="mb-1">
                <strong>{comment.student.nickname}</strong>
            </p>

            <p className="m-2">
                {comment.comment}
            </p>

            <p className="mb-1">
                <strong>Nota:</strong> {comment.note}
            </p>

            <p className="mb-0">
                <strong>Es positivo:</strong> {comment.isPositive ? 'Sí' : 'No'}
            </p>
        </div>
    );
};

export default CardComment;