CREATE PROCEDURE [dbo].[spTherapeuticClass_GetAll]
	
AS
Begin
	set nocount on;
	SELECT * from TherapeuticClass
End