
const Comment = ({ comment }: { comment: string } ) => {
    return (
        <div className="row justify-content-center my-2">
            <div className="col-10 overflow-x-hidden">
                <div className="border p-3">
                    <p className="font-weight-bold"> {comment} </p>
                </div>
            </div>
        </div>
    );
}

export default Comment;