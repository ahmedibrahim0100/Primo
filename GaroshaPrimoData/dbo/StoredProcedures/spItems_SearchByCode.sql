CREATE PROCEDURE [dbo].[spItems_SearchByCode]
	@identifier varchar(200)
as
Begin
set nocount on;

select * from dbo.ItemsMaster
where ItemsMaster.ItemId 
in (select ItemId from dbo.ItemsCodes where ItemsCodes.ItemCode = @identifier)


END
