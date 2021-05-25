CREATE TABLE [dbo].[ItemTherapeuticClass]
(
	[ItemId] INT,
	[TherapeuticClassId] INT,
	CONSTRAINT [FK_ItemTherapeuticClass_ItemsMaster] FOREIGN KEY ([ItemId]) REFERENCES [ItemsMaster]([ItemId]),
	CONSTRAINT [FK_ItemTherapeuticClass_TherapeuticClass] FOREIGN KEY ([TherapeuticClassId]) REFERENCES [TherapeuticClass]([Id])
)
