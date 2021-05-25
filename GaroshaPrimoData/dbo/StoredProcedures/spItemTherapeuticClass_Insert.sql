CREATE PROCEDURE [dbo].[spItemTherapeuticClass_Insert]
	@ItemId INT,
	@TherapeuticClassId INT
AS
	BEGIN
	SET NOCOUNT ON;
	INSERT INTO dbo.ItemTherapeuticClass (ItemId, TherapeuticClassId)
	VALUES (@ItemId, @TherapeuticClassId);
	END
