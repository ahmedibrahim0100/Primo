CREATE PROCEDURE [dbo].[spProducerCompanies_GetAll]

AS
Begin
	set nocount on;
	SELECT * from ProducerCompanies
End
