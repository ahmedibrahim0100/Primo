CREATE PROCEDURE [dbo].[spUserLookup]
	@Id nvarchar(128)
As
Begin
	set nocount on;
	Select [Id], [Name], [Email], [CreatedDate], [Status] from [dbo].[User]
	where Id = @Id;
End

