await Comment.create({
        content: req.body.comment,
        blogId: "6853fef886d26f3a38ae9d76",//hardcoded for demo
        createdBy: "6853fd1b4a253a25b5eab3a3",//hardcoded for demo
    })
comment schema is not referrencing blogid and createdby automatically