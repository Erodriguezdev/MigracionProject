#Api in Net 8

#FrontEnd in Reat


##Table to create

CREATE TABLE [dbo].[Task] (
    [Id]          INT           IDENTITY (1, 1) NOT NULL,
    [Title]       VARCHAR (100) NOT NULL,
    [Description] VARCHAR (200) NULL,
    [IsDone]      BIT           NOT NULL,
    [DueDate]     DATETIME      NOT NULL,
    CONSTRAINT [PK_Task] PRIMARY KEY CLUSTERED ([Id] ASC)
);

